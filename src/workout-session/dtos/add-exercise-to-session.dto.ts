import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export class AddExerciseToSessionDto {
  @ApiProperty({ example: 'uuid-of-barbell-squat' })
  @IsUUID()
  exerciseId!: string; // Reference to your catalog

  @ApiProperty({ example: 4 })
  @IsNumber()
  sets!: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  reps!: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  weight!: number;
}