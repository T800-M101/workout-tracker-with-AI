import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

describe('ExerciseController', () => {
  let controller: ExerciseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseController],
      providers: [
      {
        provide: ExerciseService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([]),
          findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Press Banca' }),
        },
      },
    ],
    }).compile();

    controller = module.get<ExerciseController>(ExerciseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
