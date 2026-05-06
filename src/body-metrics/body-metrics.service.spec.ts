import { Test, TestingModule } from '@nestjs/testing';
import { BodyMetricsService } from './body-metrics.service';

describe('BodyMetricsService', () => {
  let service: BodyMetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BodyMetricsService],
    }).compile();

    service = module.get<BodyMetricsService>(BodyMetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
