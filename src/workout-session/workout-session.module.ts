import { Module } from '@nestjs/common';
import { WorkoutSessionService } from './workout-session.service';
import { WorkoutSessionsController } from './workout-session.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutSessionsController],
  providers: [WorkoutSessionService],
})
export class WorkoutSessionModule {}
