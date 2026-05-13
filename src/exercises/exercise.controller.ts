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
import { ApiFindAllExercises } from './decorators/api-find-all-exercises.decorator';
import { ExerciseService } from './exercise.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import {
  CreateExerciseDto,
  ExerciseCategory,
} from './dtos/create-exercise.dto';
import { UpdateExerciseDto } from './dtos/update-exercise.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCreateExercises } from './decorators/api-create-exercises.decorator';
import { ApiDeleteExercises } from './decorators/api-delete-exercises.decorator';
import { ApiUpdateExercises } from './decorators/api-update-exercises.decorator';
import { ApiFindByIdExercises } from './decorators/api-find-by-id-exercises.decorator';

@ApiTags('Exercises')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

/* GET EXERCISES */
  @Get()
  @ApiFindAllExercises()
  findAll(@Query('category') category?: ExerciseCategory, @Query('search') search?: string ) {
    return this.exerciseService.findAll(category, search);
  }

/* GET EXERCISES BY ID*/
  @Get(':id')
  @ApiFindByIdExercises()
  findById(@Param('id') id: string) {
    return this.exerciseService.findById(id);
  }

/* CREATE EXERCISES */
  @Post()
  @ApiCreateExercises()
  create(@Req() req: any, @Body() dto: CreateExerciseDto) {
    const userId = req.user.sub;
    return this.exerciseService.create(userId, dto);
  }

/* UPDATE EXERCISES */
  @Patch(':id')
  @ApiUpdateExercises()
  update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateExerciseDto) {
    const userId = req.user.sub;
    return this.exerciseService.update(id, userId, dto);
  }

/* DELETE EXERCISES */
  @Delete(':id')
  @ApiDeleteExercises()
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 en lugar del 200 por defecto
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.exerciseService.remove(id, userId);
  }
}


