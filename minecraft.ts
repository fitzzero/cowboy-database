'use server'

import { Minecraft, Prisma } from '@prisma/client'
import { prisma } from './prisma'
import { resHandler, UserAction } from './response'
import { logger } from './logger'
import { WithId } from './definitions'

/**
 * Find a Minecraft record by its ID.
 * @param id - The ID of the Minecraft record to find.
 * @returns The Minecraft object if found, otherwise null.
 */
export const minecraftFindById = async (id: string) => {
  return await prisma.minecraft.findUnique({
    where: { id },
  })
}

/**
 * Create a new Minecraft profile.
 * @param data - The data for the new Minecraft profile.
 * @returns The created Minecraft object.
 */
export const minecraftCreate = async (data: Prisma.MinecraftCreateInput) => {
  return await prisma.minecraft.create({
    data,
  })
}

/**
 * Update a Minecraft profile by its ID.
 * @param data - The data to update the Minecraft profile with.
 * @returns The updated Minecraft object.
 */
export const minecraftUpdateById = async (
  data: Prisma.MinecraftUpdateInput & WithId
) => {
  return await prisma.minecraft.update({
    where: { id: data.id },
    data,
  })
}

export interface MinecraftCreateOrUpdateByNameProps {
  name: string
}

/**
 * Create a new Minecraft profile from a given name.
 * @param userId - The ID of the user to associate with the Minecraft profile.
 * @param name - The name of the Minecraft profile.
 * @returns The created Minecraft object.
 */
export const minecraftCreateOrUpdateByName: UserAction<
  Minecraft,
  MinecraftCreateOrUpdateByNameProps
> = async ({ data: existing }, { name, userId }) => {
  const minecraftId = await getMinecraftPublicProfile(name)
  if (!minecraftId)
    return resHandler.handle500('Error finding Minecraft profile')
  const skinUrl = await getMinecraftPublicSkin(minecraftId)
  if (!skinUrl) return resHandler.handle500('Error finding Minecraft skin')

  const image = `https://mc-heads.net/avatar/${minecraftId}`

  let dataNew: Minecraft | undefined = undefined
  if (existing) {
    try {
      dataNew = await minecraftUpdateById({
        id: existing?.id,
        skinUrl,
        name,
        image,
        minecraftId,
      })
    } catch (err: any) {
      logger.alert(err.message, 'minecraft')
      return resHandler.handle500('Error updating Minecraft profile')
    }
  } else {
    try {
      dataNew = await minecraftCreate({
        user: { connect: { id: userId } },
        name,
        image,
        minecraftId,
        skinUrl,
      })
    } catch (err: any) {
      logger.alert(err.message, 'minecraft')
      return resHandler.handle500('Error creating Minecraft profile')
    }
  }
  if (!dataNew) return resHandler.handle500('Error creating Minecraft profile')
  return resHandler.handle200(dataNew)
}

/**
 * Get the public profile ID of a Minecraft user by their handle.
 * @param handle - The Minecraft handle to look up.
 * @returns The ID of the Minecraft profile.
 */
export const getMinecraftPublicProfile = async (handle: string) => {
  try {
    const profileResponse = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${handle}`
    )
    const profileData: any = await profileResponse.json()
    const { id } = profileData
    return id as string
  } catch (err: any) {
    logger.alert(err, 'minecraft')
    return
  }
}

/**
 * Get the public skin URL of a Minecraft user by their profile ID.
 * @param id - The ID of the Minecraft profile.
 * @returns The URL of the Minecraft skin.
 */
export const getMinecraftPublicSkin = async (id: string) => {
  try {
    const skinResponse = await fetch(
      `https://sessionserver.mojang.com/session/minecraft/profile/${id}`
    )
    const skinData: any = await skinResponse.json()
    const base64Decoded = atob(skinData?.properties[0].value)
    const skinUrl = JSON.parse(base64Decoded).textures.SKIN.url
    return skinUrl as string
  } catch (err: any) {
    logger.alert(err, 'minecraft')
    return
  }
}
