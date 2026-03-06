import { prisma } from '@/prisma/prisma-client'
import { prismaAdapter } from '@better-auth/prisma-adapter'
import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
	/**
	 * Use Prisma as the Better Auth database.
	 * Make sure your Prisma schema includes the Better Auth tables
	 * (via `npx auth@latest generate` and a migration).
	 */
	database: prismaAdapter(prisma, { provider: 'postgresql' }),

	emailAndPassword: {
		enabled: true,
	},

	socialProviders: {
		github: {
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		},
	},

	plugins: [nextCookies()],
})
