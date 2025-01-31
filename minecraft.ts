'use server'

import { Prisma } from '@prisma/client'
import { prisma } from './prisma'

/**
 * Find a Minecraft record by its ID.
 * @param id - The ID of the Minecraft record to find.
 * @returns The Minecraft object if found, otherwise null.
 */
export const findMinecraftById = async (id: string) => {
  return await prisma.minecraft.findUnique({
    where: { id },
  })
}

/**
 * Create a new Minecraft profile.
 * @param data - The data for the new Minecraft profile.
 * @returns The created Minecraft object.
 */
export const createMinecraftProfile = async (
  data: Prisma.MinecraftCreateInput
) => {
  return await prisma.minecraft.create({
    data,
  })
}

export const getMinecraftPublicProfile = async (handle: string) => {
  const profileResponse = await fetch(
    `https://api.mojang.com/users/profiles/minecraft/${handle}`
  )
  if (!profileResponse.ok) {
    throw new Error('Failed to fetch Minecraft profile')
  }
  const profileData = await profileResponse.json()
  const { id } = profileData
  return id
}

export const getMinecraftPublicSkin = async (id: string) => {
  const skinResponse = await fetch(
    `https://sessionserver.mojang.com/session/minecraft/profile/${id}`
  )
  if (!skinResponse.ok) {
    throw new Error('Failed to fetch Minecraft skin')
  }
  const skinData = await skinResponse.json()
  const base64Decoded = atob(skinData.properties[0].value)
  const skinUrl = JSON.parse(base64Decoded).textures.SKIN.url
  return skinUrl
}
