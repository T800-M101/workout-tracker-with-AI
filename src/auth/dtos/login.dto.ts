import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ 
    example: 'guillermo.moran@example.com', 
    description: 'Email registered' 
  })
  @IsEmail()
  email!: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Your secret password' 
  })
  @IsString()
  @MinLength(6)
  password!: string;
}