import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum RecommendationType {
  WORKOUT_PLAN = 'WORKOUT_PLAN',
  RECOVERY = 'RECOVERY',
  NUTRITION = 'NUTRITION',
  PROGRESS_ANALYSIS = 'PROGRESS_ANALYSIS',
}

export class RecommendationQueryDto {
  @IsEnum(RecommendationType)
  type: RecommendationType;

  @IsOptional()
  @IsString()
  context?: string;
}