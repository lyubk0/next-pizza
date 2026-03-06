<<<<<<< HEAD
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { updateUserInfo } from "@/app/actions";
import { profileFormSchema, TFormProfileValues } from "./schemas";
import { Title, Container } from "@/components/shared";
import { FormInput } from "@/components/shared/form-components";
import { Button } from "@/components/ui";

interface Props {
  data: User;
  className?: string;
}

export const ProfileForm: React.FC<Props> = ({ data, className }) => {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormProfileValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Ваш профіль оновлено");
    } catch (error) {
      return toast.error("Помилка оновлення профілю");
    }
  };

  const onClickSignOut = async () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title text="Ваш профіль" size="md" className="font-bold" />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-full xs:w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            disabled={data.provider ? true : false}
            name="email"
            label="E-Mail"
            isClearable={data.provider ? false : true}
            required
          />
          <FormInput name="fullName" label="Повне ім'я" required />

          <FormInput type="password" name="password" label="Новий пароль" />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторіть пароль"
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Зберегти
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Вийти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
=======
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { updateUserInfo } from '@/app/actions'
import { Container, Title } from '@/components/shared'
import { FormInput } from '@/components/shared/form-components'
import { Button } from '@/components/ui'
import { authClient } from '@/lib/auth-client'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { profileFormSchema, TFormProfileValues } from './schemas'

interface Props {
	data: User
	accounts: { providerId: string }[]
	className?: string
}

export const ProfileForm: React.FC<Props> = ({ data, accounts, className }) => {
	const router = useRouter()
	const isOAuthUser = accounts.some(a => a.providerId === 'google')

	const form = useForm({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: data.name || '',
			email: data.email,
			currentPassword: '',
			password: '',
		},
	})

	const onSubmit = async (formData: TFormProfileValues) => {
		try {
			await updateUserInfo({
				email: formData.email,
				name: formData.name,
			})

			if (formData.password && formData.currentPassword) {
				const { error } = await authClient.changePassword({
					currentPassword: formData.currentPassword,
					newPassword: formData.password,
					revokeOtherSessions: true,
				})
				if (error) throw new Error(error.message)
			}

			toast.success('Your profile has been updated')
			form.reset({ ...formData, currentPassword: '', password: '' })
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Failed to update profile',
			)
		}
	}

	const onClickSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => router.push('/'),
			},
		})
	}

	return (
		<Container className='my-10'>
			<Title text='Your profile' size='md' className='font-bold' />
			<FormProvider {...form}>
				<form
					className='flex flex-col gap-5 w-full xs:w-96 mt-10'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormInput
						name='email'
						label='E-Mail'
						disabled={isOAuthUser}
						isClearable={!isOAuthUser}
						required
					/>
					<FormInput name='name' label='Name' required />

					{!isOAuthUser && (
						<>
							<FormInput
								type='password'
								name='currentPassword'
								label='Current password'
							/>
							<FormInput type='password' name='password' label='New password' />
						</>
					)}

					<Button
						disabled={form.formState.isSubmitting}
						className='text-base mt-10'
						type='submit'
					>
						Save
					</Button>

					<Button
						onClick={onClickSignOut}
						variant='secondary'
						disabled={form.formState.isSubmitting}
						className='text-base'
						type='button'
					>
						Log out
					</Button>
				</form>
			</FormProvider>
		</Container>
	)
}
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
