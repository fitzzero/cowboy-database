/*
  Warnings:

  - You are about to drop the column `onlineTime` on the `MinecraftStats` table. All the data in the column will be lost.
  - Added the required column `online` to the `MinecraftStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MinecraftStats" DROP COLUMN "onlineTime",
ADD COLUMN     "online" BOOLEAN NOT NULL;
