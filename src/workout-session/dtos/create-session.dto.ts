import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsInt, Min, Max } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({ 
    example: 'Monday Strength - Upper Body', 
    description: 'The name or title of the workout session',
    required: false 
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ 
    example: new Date().toISOString(), 
    description: 'ISO 8601 timestamp for the start of the session' 
  })
  @IsDateString()
  startedAt!: string;

  @ApiProperty({ 
    example: new Date(Date.now() + 3600000).toISOString(), 
    description: 'ISO 8601 timestamp for the end of the session',
    required: false 
  })
  @IsOptional()
  @IsDateString()
  endedAt?: string;

  @ApiProperty({ 
    example: 'Felt strong today, focus on progressive overload on bench press.', 
    description: 'Personal notes about the session',
    required: false 
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ 
    example: 8, 
    description: 'Rate of Perceived Exertion (1-10)',
    minimum: 1,
    maximum: 10,
    required: false 
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  rpe?: number;
}