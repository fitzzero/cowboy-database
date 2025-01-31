-- CreateTable
CREATE TABLE "Minecraft" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "skinUrl" TEXT,

    CONSTRAINT "Minecraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Minecraft_userId_key" ON "Minecraft"("userId");

-- AddForeignKey
ALTER TABLE "Minecraft" ADD CONSTRAINT "Minecraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
