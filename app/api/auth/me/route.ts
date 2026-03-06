import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		})

		if (!session) {
			return NextResponse.json(
				{ error: 'You are not authorized' },
				{ status: 401 },
			)
		}

		const user = {
			fullName: session.user.name ?? '',
			email: session.user.email ?? '',
		}

		return NextResponse.json(user)
	} catch (error) {
		console.error(error)

		return NextResponse.json(
			{ error: '[USER_GET] Server error' },
			{ status: 500 },
		)
	}
}
