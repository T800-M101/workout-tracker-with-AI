import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiDeleteExercises() {
  return applyDecorators(
    ApiOperation({ 
    summary: 'Remove an exercise from the catalog',
    description: 'Deletes an exercise definition permanently. Only the creator can delete it.' 
  }),
    ApiResponse({ status: 204, description: 'Exercise deleted successfully.' }),
    ApiResponse({ status: 403, description: 'Forbidden: You do not own this exercise.' }),
    ApiResponse({ status: 404, description: 'Exercise not found.' }),
    HttpCode(HttpStatus.NO_CONTENT) 
  );
}