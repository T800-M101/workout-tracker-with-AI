/*
  Warnings:

  - You are about to drop the column `endedAt` on the `WorkoutSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "endedAt",
ADD COLUMN     "duration" INTEGER;
