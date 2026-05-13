import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExerciseDto } from './create-exercise.dto';

/** 
* PartialType toma todas las propiedades de CreateExerciseDto 
* y las convierte en opcionales (@IsOptional), manteniendo 
* las reglas de validación originales. 
*/
export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @ApiProperty({ 
    example: 'Dumbbell Bench Press', 
    required: false 
  })
  override name?: string; 

  @ApiProperty({ 
    example: 'Adjusting weight for higher reps', 
    required: false 
  })
  override description?: string;
}