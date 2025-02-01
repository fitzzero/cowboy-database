/*
  Warnings:

  - Added the required column `fightingLevel` to the `MinecraftStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fightingXp` to the `MinecraftStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MinecraftStats" ADD COLUMN     "fightingLevel" INTEGER NOT NULL,
ADD COLUMN     "fightingXp" DOUBLE PRECISION NOT NULL;
