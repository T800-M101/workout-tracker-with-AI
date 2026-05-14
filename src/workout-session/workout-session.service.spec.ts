import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutSessionService } from './workout-session.service';

describe('WorkoutSessionService', () => {
  let service: WorkoutSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      {
        provide: WorkoutSessionService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
        },
      },
    ],
    }).compile();

    service = module.get<WorkoutSessionService>(WorkoutSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
