import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from './exercise.service';
import { PrismaService } from 'src/prisma/prima.service';
import { mockPrismaService } from 'src/prisma/prisma.service.mock';

describe('ExerciseService', () => {
  let service: ExerciseService;
  const prismaMock = mockPrismaService.useValue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseService, mockPrismaService],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all exercises', async () => {
    const mockExercises = [
      { id: 1, name: 'Press Banca', muscleGroup: 'Pecho' },
      { id: 2, name: 'Sentadilla', muscleGroup: 'Pierna' },
    ];

    prismaMock.exercise.findMany.mockResolvedValue(mockExercises);

    const result = await service.findAll();

    expect(result).toEqual(mockExercises);
    expect(prismaMock.exercise.findMany).toHaveBeenCalledTimes(1);
  });
});
