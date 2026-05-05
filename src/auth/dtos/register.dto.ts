import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ 
    example: 'guillermo.moran@example.com', 
    description: 'The user email' 
  })
  @IsEmail({}, { message: 'The email format is invalid' })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Access password (minimum 6 characters)',
    minLength: 6 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @ApiProperty({ 
    example: 'Guillermo Moran', 
    description: 'User full name' 
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}