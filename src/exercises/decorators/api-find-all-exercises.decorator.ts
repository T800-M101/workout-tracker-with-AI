import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ExerciseCategory } from 'src/exercises/dtos/create-exercise.dto';

export function ApiFindAllExercises() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve exercise catalog',
      description: 'Fetch all exercise definitions with optional category and search filters.',
    }),
    ApiQuery({
      name: 'category',
      enum: ExerciseCategory,
      required: false,
      description: 'Filter by movement type (STRENGTH, CARDIO, etc.)',
    }),
    ApiQuery({
      name: 'search',
      type: String,
      required: false,
      description: 'Search by exercise name (e.g., "Bench Press")',
    }),
    ApiResponse({
      status: 200,
      description: 'List of exercises retrieved successfully.',
    }),
  );
}