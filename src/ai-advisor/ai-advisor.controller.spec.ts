import { Test, TestingModule } from '@nestjs/testing';
import { AiAdvisorController } from './ai-advisor.controller';
import { AiAdvisorService } from './ai-advisor.service';

describe('AiAdvisorController', () => {
  let controller: AiAdvisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAdvisorController],
      providers: [AiAdvisorService],
    }).compile();

    controller = module.get<AiAdvisorController>(AiAdvisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
