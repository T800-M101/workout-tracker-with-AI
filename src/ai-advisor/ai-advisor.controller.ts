import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiAdvisorService } from './ai-advisor.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RecommendationQueryDto } from './dtos/recommendation-query.dto';
import { CurrentUser } from 'src/common/decorators/get-current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('ai-advisor')
export class AiAdvisorController {
  constructor(private readonly aiAdvisorService: AiAdvisorService) {}
  
  @Post('recommendations')
  getRecommendations(
    @CurrentUser('sub') userId: string,
    @Body() dto: RecommendationQueryDto,
  ) {
    return this.aiAdvisorService.getRecommendations(userId, dto);
  }
}
