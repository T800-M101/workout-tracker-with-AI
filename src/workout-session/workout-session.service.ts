import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prima.service';
import { CreateSessionDto } from './dtos/create-session.dto';
import { LogSetDto } from './dtos/log-set.dto';
import { AddWorkoutDto } from './dtos/add-workout.dto';

@Injectable()
export class WorkoutSessionService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Sessions ──────────────────────────────────────────

  async findAll(userId: string) {
    return this.prisma.workoutSession.findMany({
      where: { userId },
      include: {
        workouts: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async findById(userId: string, sessionId: string) {
    const session = await this.prisma.workoutSession.findUnique({
      where: { id: sessionId },
      include: {
        workouts: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.userId !== userId) {
      throw new ForbiddenException();
    }

    return session;
  }

  async create(userId: string, dto: CreateSessionDto) {
    return this.prisma.workoutSession.create({
      data: {
        userId,
        title: dto.name ?? 'Nueva Sesión',
        date: new Date(dto.startedAt),
        notes: dto.notes,
      },
    });
  }

  async update(userId: string, sessionId: string, dto: any) {
    return this.prisma.workoutSession.update({
      where: { id: sessionId },
      data: {
        title: dto.title,
        notes: dto.notes,
      },
    });
  }

  // ── Exercises within session ───────────────────────────

  async addWorkout(userId: string, sessionId: string, dto: AddWorkoutDto) {
  
  return this.prisma.workout.create({
    data: {
      sets: dto.sets,
      reps: dto.reps,
      weight: dto.weight,
      order: dto.order,
      // name: dto.name, <--- DELETE THIS LINE
      
      // Use the relational 'connect' syntax
      exercise: {
        connect: { id: dto.exerciseId }
      },
      session: {
        connect: { id: sessionId }
      }
    },
  });
}

  // ── Sets ──────────────────────────────────────────────

  async logSet(
    userId: string,
    sessionId: string,
    workoutId: string,
    dto: LogSetDto,
  ) {
    const session = await this.findById(userId, sessionId);

    const workout = session.workouts.find((w) => w.id === workoutId);

    if (!workout) {
      throw new NotFoundException('Workout not found in this session');
    }

    return this.prisma.workout.update({
      where: { id: workoutId },
      data: {
        sets: dto.setNumber,
        reps: dto.reps,
        weight: dto.weightKg,
      },
    });
  }

  // ── Helpers ───────────────────────────────────────────

  private calcDurationMin(startedAt: string, endedAt: string): number {
    const diff = new Date(endedAt).getTime() - new Date(startedAt).getTime();
    return Math.round(diff / 60000);
  }
}
