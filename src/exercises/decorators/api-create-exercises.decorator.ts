import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiCreateExercises() {
  return applyDecorators(
      ApiOperation({
        summary: 'Create a new exercise definition (Add to Catalog)',
      }),
      ApiResponse({
        status: 201,
        description: 'Exercise added to catalog successfully.',
      }),
      ApiResponse({
        status: 409,
        description: 'An exercise with this name already exists.',
      })
  );
}