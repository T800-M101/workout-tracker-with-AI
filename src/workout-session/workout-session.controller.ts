import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { WorkoutSessionService } from './workout-session.service';
import { CreateSessionDto } from './dtos/create-session.dto';
import { AddWorkoutDto } from './dtos/add-workout.dto';
import { LogSetDto } from './dtos/log-set.dto';
import { CurrentUser } from '../common/decorators/get-current-user.decorator'; 
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Workout Sessions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workout-sessions')
export class WorkoutSessionsController {
  constructor(private readonly sessionsService: WorkoutSessionService) {}

  @Get()
  findAll(@CurrentUser('sub') userId: string) {
    return this.sessionsService.findAll(userId);
  }

  @Get(':id')
  findById(@CurrentUser('sub') userId: string, @Param('id') sessionId: string) {
    return this.sessionsService.findById(userId, sessionId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new workout session' })
  @ApiResponse({ status: 201, description: 'The session has been successfully created.', type: CreateSessionDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@CurrentUser('sub') userId: string, @Body() dto: CreateSessionDto) {
    return this.sessionsService.create(userId, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser('sub') userId: string,
    @Param('id') sessionId: string,
    @Body() dto: Partial<CreateSessionDto>,
  ) {
    return this.sessionsService.update(userId, sessionId, dto);
  }

  @Post(':id/workouts')
  addWorkout(
    @CurrentUser('sub') userId: string,
    @Param('id') sessionId: string,
    @Body() dto: AddWorkoutDto,
  ) {
    return this.sessionsService.addWorkout(userId, sessionId, dto);
  }

  @Post(':id/workouts/:workoutId/log')
  logSet(
    @CurrentUser('sub') userId: string,
    @Param('id') sessionId: string,
    @Param('workoutId') workoutId: string,
    @Body() dto: LogSetDto,
  ) {
    return this.sessionsService.logSet(userId, sessionId, workoutId, dto);
  }
}
