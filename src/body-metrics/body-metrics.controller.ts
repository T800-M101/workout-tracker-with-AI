import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { BodyMetricsService } from './body-metrics.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateMetricDto } from './dtos/create-metric.dto';
import { CurrentUser } from 'src/common/decorators/get-current-user.decorator';


@UseGuards(JwtAuthGuard)
@Controller('body-metrics')
export class BodyMetricsController {
  constructor(private readonly bodyMetricsService: BodyMetricsService) {}

  @Get()
  getLatest(@CurrentUser('sub') userId: string) {
    return this.bodyMetricsService.getLatest(userId);
  }

  @Get('history')
  getHistory(
    @CurrentUser('sub') userId: string,
    @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit: number,
  ) {
    return this.bodyMetricsService.getHistory(userId, limit);
  }

  @Post()
  create(
    @CurrentUser('sub') userId: string,
    @Body() dto: CreateMetricDto,
  ) {
    return this.bodyMetricsService.create(userId, dto);
  }
}
