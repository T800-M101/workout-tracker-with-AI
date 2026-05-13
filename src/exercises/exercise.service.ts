import { Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateExerciseDto, ExerciseCategory } from './dtos/create-exercise.dto';
import { PrismaService } from 'src/prisma/prima.service';
import { UpdateExerciseDto } from './dtos/update-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new exercise in the global catalog.
  */
 async create(userId: string, dto: CreateExerciseDto) {
  const existing = await this.prisma.exercise.findUnique({
    where: { name: dto.name },
  });

  if (existing) {
    throw new ConflictException(`Exercise "${dto.name}" already exists.`);
  }

  return this.prisma.exercise.create({
    data: {
      name: dto.name,
      category: dto.category,
      muscleGroups: dto.muscleGroups,
      equipment: dto.equipment,
      description: dto.description,
      user: {
        connect: { id: userId }
      }
    },
  });
}

  /**
   * Retrieves exercises with optional filters for your 3-day split.
   */
  async findAll(category?: ExerciseCategory, search?: string) {
    return this.prisma.exercise.findMany({
      where: {
        AND: [
          category ? { category } : {},
          search ? { name: { contains: search, mode: 'insensitive' } } : {},
        ],
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Finds an specific exercise definition by ID.
   */
  async findById(id: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found.`);
    }

    return exercise;
  }

   /**
   * Updates an specific exercise definition by ID.
   */

  async update(id: string, userId: string, dto: UpdateExerciseDto) {
  const exercise = await this.prisma.exercise.findUnique({ where: { id } });
  
  if (!exercise) throw new NotFoundException('Exercise not found');
  if (exercise.userId !== userId) throw new ForbiddenException('Not your exercise');

  return this.prisma.exercise.update({
    where: { id },
    data: dto,
  });
}

 /**
   * Delete an specific exercise definition by ID.
   */
async remove(id: string, userId: string) {
  const exercise = await this.prisma.exercise.findUnique({ where: { id } });
  
  if (!exercise) throw new NotFoundException('Exercise not found');
  if (exercise.userId !== userId) throw new ForbiddenException('Not your exercise');

  await this.prisma.exercise.delete({ where: { id } });
  return;
}
}