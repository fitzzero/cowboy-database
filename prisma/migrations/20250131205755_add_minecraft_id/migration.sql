/*
  Warnings:

  - A unique constraint covering the columns `[minecraftId]` on the table `Minecraft` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `minecraftId` to the `Minecraft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Minecraft" ADD COLUMN     "minecraftId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Minecraft_minecraftId_key" ON "Minecraft"("minecraftId");
