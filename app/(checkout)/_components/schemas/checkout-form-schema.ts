import { z } from 'zod'

export const checkoutFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: 'First name must be at least 2 characters long' }),
	lastName: z
		.string()
		.min(2, { message: 'Last name must be at least 2 characters long' }),
	email: z.string().email({ message: 'Please enter a valid email address' }),
	phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
	address: z.string().min(3, { message: 'Please enter a valid address' }),
	comment: z.string().optional(),
})

export type ChechoutFormValues = z.infer<typeof checkoutFormSchema>
