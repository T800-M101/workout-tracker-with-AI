import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prima.service';
import { CreateMetricDto } from './dtos/create-metric.dto';

@Injectable()
export class BodyMetricsService {
  constructor(private readonly prisma: PrismaService) {}

  async getLatest(userId: string) {
    const metric = await this.prisma.bodyMetric.findFirst({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    if (!metric) throw new NotFoundException('No metrics recorded yet');
    return metric;
  }

  async getHistory(userId: string, limit = 30) {
    return this.prisma.bodyMetric.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: limit,
    });
  }

  async create(userId: string, dto: CreateMetricDto) {
    if (dto.weightKg === undefined) {
      throw new BadRequestException(
        'El peso es obligatorio para registrar una métrica.',
      );
    }

    return this.prisma.bodyMetric.create({
      data: {
        userId,
        date: dto.recordedAt ? new Date(dto.recordedAt) : new Date(),
        weight: dto.weightKg,
        height: dto.height ?? 1.7,
      },
    });
  }
}
