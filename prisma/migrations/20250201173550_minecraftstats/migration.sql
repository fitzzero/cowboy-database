-- CreateTable
CREATE TABLE "MinecraftStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "minecraftId" TEXT NOT NULL,
    "money" DOUBLE PRECISION NOT NULL,
    "onlineTime" BOOLEAN NOT NULL,
    "foragingLevel" INTEGER NOT NULL,
    "foragingXp" DOUBLE PRECISION NOT NULL,
    "miningLevel" INTEGER NOT NULL,
    "miningXp" DOUBLE PRECISION NOT NULL,
    "enchantingLevel" INTEGER NOT NULL,
    "enchantingXp" DOUBLE PRECISION NOT NULL,
    "farmingLevel" INTEGER NOT NULL,
    "farmingXp" DOUBLE PRECISION NOT NULL,
    "alchemyLevel" INTEGER NOT NULL,
    "alchemyXp" DOUBLE PRECISION NOT NULL,
    "defenseLevel" INTEGER NOT NULL,
    "defenseXp" DOUBLE PRECISION NOT NULL,
    "excavationLevel" INTEGER NOT NULL,
    "excavationXp" DOUBLE PRECISION NOT NULL,
    "archeryLevel" INTEGER NOT NULL,
    "archeryXp" DOUBLE PRECISION NOT NULL,
    "fishingLevel" INTEGER NOT NULL,
    "fishingXp" DOUBLE PRECISION NOT NULL,
    "agilityLevel" INTEGER NOT NULL,
    "agilityXp" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MinecraftStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MinecraftStats_userId_key" ON "MinecraftStats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MinecraftStats_minecraftId_key" ON "MinecraftStats"("minecraftId");

-- CreateIndex
CREATE UNIQUE INDEX "MinecraftStats_userId_minecraftId_key" ON "MinecraftStats"("userId", "minecraftId");

-- AddForeignKey
ALTER TABLE "MinecraftStats" ADD CONSTRAINT "MinecraftStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MinecraftStats" ADD CONSTRAINT "MinecraftStats_minecraftId_fkey" FOREIGN KEY ("minecraftId") REFERENCES "Minecraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
