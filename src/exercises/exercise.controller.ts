import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ExerciseService } from './exercise.service'; // Renamed service
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateExerciseDto, ExerciseCategory } from './dtos/create-exercise.dto'; // Renamed DTO and Enum

@ApiTags('Exercises') 
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve exercise catalog',
    description: 'Fetch all exercise definitions with optional category and search filters.',
  })
  @ApiQuery({
    name: 'category',
    enum: ExerciseCategory,
    required: false,
    description: 'Filter by movement type (STRENGTH, CARDIO, etc.)',
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
    description: 'Search by exercise name (e.g., "Bench Press")',
  })
  @ApiResponse({
    status: 200,
    description: 'List of exercises retrieved successfully.',
  })
  findAll(
    @Query('category') category?: ExerciseCategory,
    @Query('search') search?: string,
  ) {
    return this.exerciseService.findAll(category, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exercise details from catalog' })
  @ApiResponse({ status: 200, description: 'Exercise definition found.' })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  findById(@Param('id') id: string) {
    return this.exerciseService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new exercise definition (Add to Catalog)' })
  @ApiResponse({ status: 201, description: 'Exercise added to catalog successfully.' })
  @ApiResponse({ status: 409, description: 'An exercise with this name already exists.' })
  create(@Req() req: any, @Body() dto: CreateExerciseDto) {
  const userId = req.user.sub; // Or wherever your JWT guard stores the ID
  return this.exerciseService.create(userId, dto);
}
}