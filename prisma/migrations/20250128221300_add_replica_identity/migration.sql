/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "VerificationToken";
