<<<<<<< HEAD
import { z } from "zod";

export const optionalPasswordSchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (value) {
        return value.length >= 6;
      }
      return true;
    },
    { message: "Пароль повинен містити не менше 6 символів" }
  );

export const profileFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Ім'я повинно містити не менше 2 символів" }),
    email: z.string().email({ message: "Введіть коректний E-Mail" }),
    password: optionalPasswordSchema,
    confirmPassword: optionalPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export type TFormProfileValues = z.infer<typeof profileFormSchema>;
=======
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
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
