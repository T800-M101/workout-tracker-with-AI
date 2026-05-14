import { Test, TestingModule } from '@nestjs/testing';
import { AiAdvisorService } from './ai-advisor.service';
import { ConfigService } from '@nestjs/config';
import { mockPrismaService } from 'src/prisma/prisma.service.mock';

describe('AiAdvisorService', () => {
  let service: AiAdvisorService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiAdvisorService, 
        mockPrismaService,
        { 
          provide: ConfigService, 
          useValue: { get: jest.fn().mockReturnValue('some-api-key') } 
        }
      ],
    }).compile();

    service = module.get<AiAdvisorService>(AiAdvisorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
