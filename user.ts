'use server'

import { prisma } from './prisma'

export const userFindByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  })
}
