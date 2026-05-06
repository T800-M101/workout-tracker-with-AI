import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './exercises/exercise.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { WorkoutSessionModule } from './workout-session/workout-session.module';
import { BodyMetricsModule } from './body-metrics/body-metrics.module';
import { AiAdvisorModule } from './ai-advisor/ai-advisor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the variables available throughout the app
    }),
    AuthModule, 
    UsersModule, 
    WorkoutsModule, 
    BodyMetricsModule, 
    AiAdvisorModule, 
    PrismaModule, 
    WorkoutSessionModule, 
    BodyMetricsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
