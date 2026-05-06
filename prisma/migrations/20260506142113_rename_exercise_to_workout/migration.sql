/*
  Warnings:

  - You are about to drop the column `date` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reps` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "date",
DROP COLUMN "duration",
DROP COLUMN "notes",
DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "sets" INTEGER NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Exercise";

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "notes" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
