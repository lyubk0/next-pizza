import { prisma } from '@/prisma/prisma-client'
import { getUserSession } from './get-user-session'

export async function getUserAccounts() {
	const currentUser = await getUserSession()
	if (!currentUser) throw new Error('User not found')

	const accounts = await prisma.account.findMany({
		where: { userId: currentUser.id },
		select: { providerId: true },
	})

	return accounts
}
