import { PrismaClient, ExerciseCategory } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Iniciando el proceso de Seeding ---');

  // 1. CLEANUP: We remove previous data (Order matters due to foreign keys)
 // First we delete exercises, then users.
  await prisma.exercise.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Base de datos limpia.');

  // 2. CREATION OF ADMIN USER: Necessary to link the exercises
  const hashedPassword = await bcrypt.hash('Admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@workouttracker.com',
      password: hashedPassword,
      // name: 'Admin User', // Add fields according to your schema.prism
    },
  });
  console.log(`✅ Usuario Admin creado: ${adminUser.email}`);

  // 3. DEFINITION OF CATALOG EXERCISES
  const exercises = [
    {
      name: 'Barbell Squat',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Quads', 'Glutes', 'Hamstrings'],
      equipment: 'Power Rack and Barbell',
      description: 'The king of lower body exercises focusing on depth and posture.',
    },
    {
      name: 'Bench Press',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
      equipment: 'Flat Bench and Barbell',
      description: 'Classic compound movement for upper body push strength.',
    },
    {
      name: 'Deadlift',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Lower Back', 'Hamstrings', 'Glutes', 'Forearms'],
      equipment: 'Barbell',
      description: 'Fundamental pull movement for posterior chain development.',
    },
    {
      name: 'Pull Ups',
      category: ExerciseCategory.STRENGTH,
      muscleGroups: ['Lats', 'Biceps', 'Upper Back'],
      equipment: 'Pull-up Bar',
      description: 'Bodyweight vertical pull exercise.',
    },
    {
      name: 'Running',
      category: ExerciseCategory.CARDIO,
      muscleGroups: ['Legs', 'Heart'],
      equipment: 'None or Treadmill',
      description: 'Steady state cardiovascular exercise.',
    },
    {
      name: 'Burpees',
      category: ExerciseCategory.HIIT,
      muscleGroups: ['Full Body'],
      equipment: 'Bodyweight',
      description: 'High intensity full body movement.',
    }
  ];

  // 4. INSERTING EXERCISES
  console.log('⏳ Cargando ejercicios...');
  
  for (const ex of exercises) {
    await prisma.exercise.create({
      data: {
        ...ex,
        user: {
          connect: { id: adminUser.id }
        }
      },
    });
  }

  console.log(`✅ ${exercises.length} exercises successfully loaded.`);
  console.log('--- Seeding completed successfully ---');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });