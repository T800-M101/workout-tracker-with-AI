import { Test, TestingModule } from '@nestjs/testing';
import { AiAdvisorController } from './ai-advisor.controller';
import { AiAdvisorService } from './ai-advisor.service';
import { ConfigService } from '@nestjs/config';

describe('AiAdvisorController', () => {
  let controller: AiAdvisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAdvisorController],
      providers: [AiAdvisorService, {
    provide: AiAdvisorService,
    useValue: {
      getAdvice: jest.fn().mockResolvedValue('Entrena duro, Memo'),
    },
  },
  {
    provide: ConfigService,
    useValue: { get: jest.fn() },
  },],
    }).compile();

    controller = module.get<AiAdvisorController>(AiAdvisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
