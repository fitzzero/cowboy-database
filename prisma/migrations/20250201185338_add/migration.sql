/*
  Warnings:

  - Made the column `totalLevel` on table `MinecraftStats` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MinecraftStats" ALTER COLUMN "totalLevel" SET NOT NULL;
