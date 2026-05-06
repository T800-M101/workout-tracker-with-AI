import { Module } from '@nestjs/common';
import { AiAdvisorService } from './ai-advisor.service';
import { AiAdvisorController } from './ai-advisor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [AiAdvisorController],
  providers: [AiAdvisorService],
})
export class AiAdvisorModule {}
