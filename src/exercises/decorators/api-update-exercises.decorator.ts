import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiUpdateExercises() {
  return applyDecorators(
      ApiOperation({ 
          summary: 'Update an exercise definition',
          description: 'Updates specific fields of an existing exercise. Only the creator can update it.' 
        }),
      ApiResponse({ status: 200, description: 'Exercise updated successfully.' }),
      ApiResponse({ status: 403, description: 'Forbidden: You do not own this exercise.' }),
      ApiResponse({ status: 404, description: 'Exercise not found.' })
  );
}