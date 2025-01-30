'use server'

import { prisma } from './prisma'

/**
 * Find a user by their email.
 * @param email - The email of the user to find.
 * @returns The user object if found, otherwise null.
 */
export const userFindByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  })
}

/**
 * Find a user by their ID.
 * @param id - The ID of the user to find.
 * @returns The user object if found, otherwise null.
 */
export const userFindById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  })
}
