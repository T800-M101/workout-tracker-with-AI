import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prima.service';
import {
  RecommendationQueryDto,
  RecommendationType,
} from './dtos/recommendation-query.dto';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class AiAdvisorService {
  private anthropic: Anthropic;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.anthropic = new Anthropic({
      apiKey: this.config.get<string>('ANTHROPIC_API_KEY'),
    });
  }

  async getRecommendations(userId: string, dto: RecommendationQueryDto) {
    const context = await this.buildUserContext(userId);
    const systemPrompt = this.buildSystemPrompt(dto.type);
    const userMessage = this.buildUserMessage(context, dto);

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      });

      const text = response.content
  .filter((b): b is Anthropic.TextBlock => b.type === 'text')
  .map((b) => b.text)
  .join('');

      return { recommendation: text, type: dto.type };
    } catch (error) {
      throw new InternalServerErrorException('AI service unavailable');
    }
  }

  private async buildUserContext(userId: string) {
    const [user, recentSessions, latestMetric] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.workoutSession.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 5,
        include: {
          workouts: {
            // CRITICAL: Include the Exercise relation to get the name
            include: { exercise: true }, 
          },
        },
      }),
      this.prisma.bodyMetric.findFirst({
        where: { userId },
        orderBy: { date: 'desc' },
      }),
    ]);

    return { profile: user, recentSessions, latestMetric };
  }

  private buildSystemPrompt(type: RecommendationType): string {
    const base = `You are an expert personal trainer and sports nutritionist.
Provide concise, evidence-based recommendations tailored to the user's data.
Always be specific, actionable, and motivating. Respond in the same language the user writes in.`;

    const typeInstructions: Record<RecommendationType, string> = {
      [RecommendationType.WORKOUT_PLAN]: `${base}\nFocus on suggesting a structured workout plan based on their recent training history and goals.`,
      [RecommendationType.RECOVERY]: `${base}\nFocus on recovery strategies: sleep, nutrition timing, deload weeks, mobility work.`,
      [RecommendationType.NUTRITION]: `${base}\nFocus on nutrition advice aligned with their fitness goals and body composition data.`,
      [RecommendationType.PROGRESS_ANALYSIS]: `${base}\nAnalyze their progress from recent sessions and metrics. Highlight improvements and areas to work on.`,
    };

    return typeInstructions[type];
  }

  private buildUserMessage(
    context: Awaited<ReturnType<typeof this.buildUserContext>>,
    dto: RecommendationQueryDto,
  ): string {
    const { profile, recentSessions, latestMetric } = context;

    return `
USER PROFILE:
- Name: ${profile?.name ?? 'User'}
- Current Weight: ${latestMetric?.weight ? `${latestMetric.weight} kg` : 'not recorded'}
- Height: ${latestMetric?.height ? `${latestMetric.height} m` : '1.70 m'} 

RECENT SESSIONS (last 5):
${recentSessions
  .map((s) => {
    const workoutSummary = s.workouts
      .map(
        // ACCESS NAME VIA RELATION: w.exercise.name instead of w.name
        (w) => `  - ${w.exercise.name}: ${w.sets} sets x ${w.reps} reps @ ${w.weight}kg`,
      )
      .join('\n');

    return `Session "${s.title ?? 'Untitled'}" (${s.date.toISOString().split('T')[0]}):\n${workoutSummary}`;
  })
  .join('\n\n')}

ADDITIONAL CONTEXT FROM USER:
${dto.context ?? 'None provided.'}

Please provide a ${dto.type.toLowerCase().replace('_', ' ')} recommendation.
  `.trim();
  }
}