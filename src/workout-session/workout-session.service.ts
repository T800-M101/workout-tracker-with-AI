import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prima.service';
import { AddWorkoutDto } from './dtos/add-workout.dto';

@Injectable()
export class WorkoutSessionService {
  constructor(private readonly prisma: PrismaService) {}

// Create the main session entry
 async createSession(userId: string, dto: any) {
  return this.prisma.workoutSession.create({
    data: {
      title: dto.name || 'New Session', 
      notes: dto.notes,
      user: { connect: { id: userId } },
    },
  });
}

  // Add a specific exercise performance to that session
  async addWorkoutToSession(sessionId: string, dto: AddWorkoutDto) {
    return this.prisma.workout.create({
      data: {
        sets: dto.sets,
        reps: dto.reps,
        weight: dto.weight,
        order: dto.order,
        session: { connect: { id: sessionId } },
        exercise: { connect: { id: dto.exerciseId } },
      },
    });
  }
}
