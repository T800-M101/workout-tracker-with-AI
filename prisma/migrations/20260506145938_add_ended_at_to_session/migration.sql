/*
  Warnings:

  - You are about to drop the column `duration` on the `WorkoutSession` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkoutSession" DROP CONSTRAINT "WorkoutSession_userId_fkey";

-- AlterTable
ALTER TABLE "WorkoutSession" DROP COLUMN "duration",
ADD COLUMN     "endedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
