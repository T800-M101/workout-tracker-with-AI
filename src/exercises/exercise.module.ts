import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';


@Module({
  imports: [PrismaModule],
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class WorkoutsModule {}
