import { Test, TestingModule } from '@nestjs/testing';
import { AiAdvisorService } from './ai-advisor.service';

describe('AiAdvisorService', () => {
  let service: AiAdvisorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAdvisorService],
    }).compile();

    service = module.get<AiAdvisorService>(AiAdvisorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
