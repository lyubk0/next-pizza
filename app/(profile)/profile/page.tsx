import { getUserSession } from '@/lib/get-user-session'
import { prisma } from '@/prisma/prisma-client'
import { redirect } from 'next/navigation'
import { ProfileForm } from '../_components/forms/profile-form'

export default async function ProfilePage() {
	const session = await getUserSession()
	if (!session) return redirect('/not-auth')

	const [user, accounts] = await Promise.all([
		prisma.user.findFirst({ where: { id: session.id } }),
		prisma.account.findMany({
			where: { userId: session.id },
			select: { providerId: true },
		}),
	])

	if (!user) return redirect('/not-auth')

	return <ProfileForm data={user} accounts={accounts} />
}
