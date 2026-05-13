import { Module } from '@nestjs/common';
import { WorkoutSessionService } from './workout-session.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkoutSessionController } from './workout-session.controller';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutSessionController],
  providers: [WorkoutSessionService],
})
export class WorkoutSessionModule {}
