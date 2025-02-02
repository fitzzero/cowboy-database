'use server'

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

export const minecraftStatsFindByUserId = async (id: string) => {
  return await prisma.minecraftStats.findFirst({
    where: { userId: id },
  })
}

export const minecraftStatsByTopTotalLevel = async (limit: number) => {
  return await prisma.minecraftStats.findMany({
    orderBy: { totalLevel: 'desc' },
    include: { minecraft: true, user: true },
    take: limit,
  })
}
