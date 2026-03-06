// middleware.ts
import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/profile']

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const session = getSessionCookie(request)

	const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

	if (isProtected && !session) {
		return NextResponse.redirect(new URL('/not-auth', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
