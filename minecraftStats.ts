import { Prisma } from '@prisma/client'
import { prisma } from './prisma'
import { WithId } from './definitions'

export const minecraftStatsCreate = async (
  data: Prisma.MinecraftStatsCreateInput
) => {
  return await prisma.minecraftStats.create({
    data,
  })
}

export const minecraftStatsUpdateById = async (
  data: Prisma.MinecraftStatsUpdateInput & WithId
) => {
  return await prisma.minecraftStats.update({
    where: { id: data.id },
    data,
  })
}
