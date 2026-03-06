<<<<<<< HEAD
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль повинен містити не менше 6 символів" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введіть коректний E-Mail" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: "Ім'я повинно містити не менше 2 символів" }),

      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });
export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
=======
import { z } from 'zod'

export const passwordSchema = z
	.string()
	.min(6, { message: 'Password must be at least 6 characters long' })

export const formLoginSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }),
	password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			name: z
				.string()
				.min(2, { message: 'Name must be at least 2 characters long' }),

			confirmPassword: passwordSchema,
		}),
	)
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
