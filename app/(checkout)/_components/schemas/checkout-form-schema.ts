import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
<<<<<<< HEAD
    .min(2, { message: "Ім'я повинно містити не менше 2 символів" }),
  lastName: z
    .string()
    .min(2, { message: "Фамілія повинна містити не менше 2 символів" }),
  email: z.string().email({ message: "Введіть коректний E-Mail" }),
  phone: z.string().min(10, { message: "Введіть коректний номер телефону" }),
  address: z.string().min(3, { message: "Введіть коректний адрес" }),
=======
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(3, { message: "Please enter a valid address" }),
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
  comment: z.string().optional(),
});

export type ChechoutFormValues = z.infer<typeof checkoutFormSchema>;
