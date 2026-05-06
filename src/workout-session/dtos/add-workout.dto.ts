import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsNumber } from 'class-validator';


export class AddWorkoutDto {
  @ApiProperty({ example: 'uuid-of-exercise' })
  @IsString()
  exerciseId!: string;

  @ApiProperty({ example: 3, description: 'Number of sets performed' })
  @IsInt()
  @Min(1)
  sets!: number; // This was missing

  @ApiProperty({ example: 10, description: 'Repetitions per set' })
  @IsInt()
  @Min(1)
  reps!: number; // This was missing

  @ApiProperty({ example: 85.5, description: 'Weight used in kg' })
  @IsNumber()
  @Min(0)
  weight!: number; // This was missing

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;

  @ApiProperty({ required: false, example: 'Focus on form' })
  @IsOptional()
  @IsString()
  notes?: string;
}