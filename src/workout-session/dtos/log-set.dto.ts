import {
  IsInt,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';

export class LogSetDto {
  @IsInt()
  @Min(1)
  setNumber!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  reps?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightKg?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  durationSec?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  distanceM?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  restSec?: number;

  @IsOptional()
  @IsBoolean()
  isWarmup?: boolean;
}