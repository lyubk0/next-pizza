"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/shared";
import { FormInput } from "@/components/shared/form-components";
=======
import { Button } from "@/components/ui/button";
import { Title } from "@/components/shared";
import { FormInput } from "@/components/shared/form-components";
import { authClient } from "@/lib/auth-client";
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)

interface Props {
  isLoading: boolean;
  onClose: () => void;
  className?: string;
}

export const LoginForm: React.FC<Props> = ({
  isLoading,
  onClose,
  className,
}) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
<<<<<<< HEAD
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (!resp?.ok) {
        throw new Error(resp?.error || "Error [LOGIN]");
      }

      toast.success("Успішний вхід в аккаунт");
      onClose();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Не вдалося ввійти в аккаунт");
=======
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message || "Error [LOGIN]");
      }

      toast.success("Successfully logged in");
      onClose();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Could not log into your account");
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
<<<<<<< HEAD
            <Title text="Вхід в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введіть свою пошту, щоб увійти в свій аккаунт
=======
            <Title text="Sign in to account" size="md" className="font-bold" />
            <p className="text-gray-400">
              Enter your email to sign in to your account
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
            </p>
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
<<<<<<< HEAD
        <FormInput name="password" label="Пароль" type="password" required />
=======
        <FormInput name="password" label="Password" type="password" required />
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)

        <Button
          loading={form.formState.isSubmitting || isLoading}
          className="h-12 text-base"
          type="submit"
        >
<<<<<<< HEAD
          Увійти
=======
          Sign in
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
        </Button>
      </form>
    </FormProvider>
  );
};
