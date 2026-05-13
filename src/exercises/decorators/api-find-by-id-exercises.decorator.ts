import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiFindByIdExercises() {
  return applyDecorators(
    ApiOperation({ summary: 'Get exercise details from catalog' }),
    ApiResponse({ status: 200, description: 'Exercise definition found.' }),
    ApiResponse({ status: 404, description: 'Exercise not found.' })
  );
}