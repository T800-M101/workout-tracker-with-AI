import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateMetricDto {
  @IsDateString()
  recordedAt!: string;

  @IsOptional()
  @IsNumber()
  @Min(0.5) 
  @Max(2.5)
  height?: number;

  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(500)
  weightKg?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(70)
  bodyFatPct?: number;

  @IsOptional()
  @IsNumber()
  @Min(10)
  muscleMassKg?: number;

  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(300)
  waistCm?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}