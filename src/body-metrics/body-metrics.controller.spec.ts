import { Test, TestingModule } from '@nestjs/testing';
import { BodyMetricsController } from './body-metrics.controller';
import { BodyMetricsService } from './body-metrics.service';

describe('BodyMetricsController', () => {
  let controller: BodyMetricsController;
  const mockBodyMetricsService = {
  create: jest.fn(),
  findAll: jest.fn(),
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BodyMetricsController],
      providers: [
      {
        provide: BodyMetricsService,
        useValue: mockBodyMetricsService, 
      },
    ],
    }).compile();

    controller = module.get<BodyMetricsController>(BodyMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
