import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ExerciseService } from './exercise.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import {
  CreateExerciseDto,
  ExerciseCategory,
} from './dtos/create-exercise.dto';
import { UpdateExerciseDto } from './dtos/update-exercise.dto';

@ApiTags('Exercises')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}
/* GET EXERCISES */
  @Get()
  @ApiOperation({
    summary: 'Retrieve exercise catalog',
    description:
      'Fetch all exercise definitions with optional category and search filters.',
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

  /* GET EXERCISES BY ID*/
  @Get(':id')
  @ApiOperation({ summary: 'Get exercise details from catalog' })
  @ApiResponse({ status: 200, description: 'Exercise definition found.' })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  findById(@Param('id') id: string) {
    return this.exerciseService.findById(id);
  }

  /* CREATE EXERCISES */
  @Post()
  @ApiOperation({
    summary: 'Create a new exercise definition (Add to Catalog)',
  })
  @ApiResponse({
    status: 201,
    description: 'Exercise added to catalog successfully.',
  })
  @ApiResponse({
    status: 409,
    description: 'An exercise with this name already exists.',
  })
  create(@Req() req: any, @Body() dto: CreateExerciseDto) {
    const userId = req.user.sub;
    return this.exerciseService.create(userId, dto);
  }

/* UPDATE EXERCISES */
  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update an exercise definition',
    description: 'Updates specific fields of an existing exercise. Only the creator can update it.' 
  })
  @ApiResponse({ status: 200, description: 'Exercise updated successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden: You do not own this exercise.' })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  update(
    @Param('id') id: string, 
    @Req() req: any, 
    @Body() dto: UpdateExerciseDto
  ) {
    const userId = req.user.sub;
    return this.exerciseService.update(id, userId, dto);
  }

  /* DELETE EXERCISES */
  @Delete(':id')
  @ApiOperation({ 
    summary: 'Remove an exercise from the catalog',
    description: 'Deletes an exercise definition permanently. Only the creator can delete it.' 
  })
  @ApiResponse({ status: 204, description: 'Exercise deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden: You do not own this exercise.' })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 en lugar del 200 por defecto
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.exerciseService.remove(id, userId);
  }
}
