import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { MetricsModule } from './metrics/metrics.module';
import { AiAdvisorModule } from './ai-advisor/ai-advisor.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que las variables estén disponibles en toda la app
    }),
    AuthModule, 
    UsersModule, 
    WorkoutsModule, 
    MetricsModule, 
    AiAdvisorModule, 
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
