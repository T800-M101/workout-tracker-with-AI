import { Module } from '@nestjs/common';
import { BodyMetricsService } from './body-metrics.service';
import { BodyMetricsController } from './body-metrics.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BodyMetricsController],
  providers: [BodyMetricsService],
})
export class BodyMetricsModule {}
