import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';



export class CreateSessionDto {
  @ApiProperty({ 
    example: 'Push Day - Chest & Triceps', 
    description: 'The name or focus of your gym visit' 
  })
  @IsString()
  @IsNotEmpty()
  title!: string; 

  @ApiProperty({ 
    example: 'Feeling energetic, slept 8 hours.', 
    required: false,
    description: 'General notes about the session' 
  })
  @IsOptional()
  @IsString()
  notes?: string;
}