import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { AddWorkoutDto } from './dtos/add-workout.dto';
import { CreateSessionDto } from './dtos/create-session.dto';
import { WorkoutSessionService } from './workout-session.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workout-sessions')
export class WorkoutSessionController {
  constructor(private readonly sessionService: WorkoutSessionService) {}

  /**
   * Starts a new workout session (e.g., "Push Day" or "Full Body")
   */
  @Post()
  @ApiOperation({ summary: 'Create a new workout session header' })
  @ApiResponse({ status: 201, description: 'Session created successfully.' })
  async startSession(@Req() req: any, @Body() dto: CreateSessionDto) {
    // sub is the standard JWT field for userId
    const userId = req.user.sub; 
    return this.sessionService.createSession(userId, dto);
  }

  /**
   * Logs a specific exercise performance (e.g., Squats 3x10 @ 80kg) 
   * into an active session.
   */
  @Post(':id/workouts')
  async addWorkout(
    @Param('id') sessionId: string,
    @Body() dto: AddWorkoutDto,
  ) {
    return this.sessionService.addWorkoutToSession(sessionId, dto);
  }

}
