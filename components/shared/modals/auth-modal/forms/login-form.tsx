'use client'

import { Title } from '@/components/shared'
import { FormInput } from '@/components/shared/form-components'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { formLoginSchema, TFormLoginValues } from './schemas'

interface Props {
	isLoading: boolean
	onClose: () => void
	className?: string
}

export const LoginForm: React.FC<Props> = ({
	isLoading,
	onClose,
	className,
}) => {
	const form = useForm<TFormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: TFormLoginValues) => {
		try {
			const { error } = await authClient.signIn.email({
				email: data.email,
				password: data.password,
			})

			if (error) {
				throw new Error(error.message || 'Error [LOGIN]')
			}

			toast.success('Successfully logged in')
			onClose()
		} catch (error) {
			console.log('Error [LOGIN]', error)
			toast.error('Could not log into your account')
		}
	}

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title text='Sign in to account' size='md' className='font-bold' />
						<p className='text-gray-400'>
							Enter your email to sign in to your account
						</p>
					</div>
				</div>

				<FormInput name='email' label='E-Mail' required />
				<FormInput name='password' label='Password' type='password' required />

				<Button
					loading={form.formState.isSubmitting || isLoading}
					className='h-12 text-base'
					type='submit'
				>
					Sign in
				</Button>
			</form>
		</FormProvider>
	)
}
