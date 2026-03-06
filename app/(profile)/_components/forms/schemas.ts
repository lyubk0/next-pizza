import { z } from 'zod'

export const optionalPasswordSchema = z
	.string()
	.optional()
	.refine(
		value => {
			if (value) {
				return value.length >= 6
			}
			return true
		},
		{ message: 'Password must be at least 6 characters long' },
	)

export const profileFormSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: 'Name must be at least 2 characters long' }),
		email: z.string().email({ message: 'Please enter a valid email address' }),
		currentPassword: optionalPasswordSchema,
		password: optionalPasswordSchema,
	})
	.refine(
		data => {
			if (data.password && !data.currentPassword) return false
			return true
		},
		{
			message: 'Please enter your current password',
			path: ['currentPassword'],
		},
	)
	.refine(
		data => {
			if (data.currentPassword && !data.password) return false
			return true
		},
		{
			message: 'Please enter a new password',
			path: ['password'],
		},
	)

export type TFormProfileValues = z.infer<typeof profileFormSchema>
