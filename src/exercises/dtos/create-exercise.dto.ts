import {
  IsString,
  IsEnum,
  IsArray,
  IsOptional,
  MinLength,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ExerciseCategory {
  STRENGTH = 'STRENGTH',
  CARDIO = 'CARDIO',
  FLEXIBILITY = 'FLEXIBILITY',
  BALANCE = 'BALANCE',
  HIIT = 'HIIT',
  SPORTS = 'SPORTS',
}

export class CreateExerciseDto {
  @ApiProperty({ 
    example: 'Barbell Squat', 
    description: 'The name of the exercise in the catalog' 
  })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ 
    enum: ExerciseCategory, 
    example: ExerciseCategory.STRENGTH,
    description: 'The primary classification'
  })
  @IsEnum(ExerciseCategory)
  category!: ExerciseCategory;

  @ApiProperty({ 
    example: ['Quads', 'Glutes', 'Hamstrings'], 
    description: 'List of target muscle groups' 
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  muscleGroups!: string[];

  @ApiProperty({ 
    example: 'Power Rack and Barbell', 
    required: false,
    description: 'Equipment needed for this exercise'
  })
  @IsOptional()
  @IsString()
  equipment?: string;

  @ApiProperty({ 
    example: 'Focus on depth and keeping the back straight', 
    required: false,
    description: 'General instructions for the exercise'
  })
  @IsOptional()
  @IsString()
  description?: string;
}