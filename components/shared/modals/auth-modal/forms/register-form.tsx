'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormInput } from '../../../form-components'
import { Title } from '../../../title'
import { formRegisterSchema, TFormRegisterValues } from './schemas'

interface Props {
	isLoading?: boolean
	onClose: () => void
	className?: string
}

export const RegisterForm: React.FC<Props> = ({
	isLoading,
	onClose,
	className,
}) => {
	const form = useForm<TFormRegisterValues>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TFormRegisterValues) => {
		try {
			const { error } = await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.name,
			})

			if (error) {
				throw new Error(error.message || 'Error [REGISTER]')
			}

			toast.success('Registration successful 🎉. You are now signed in.')
			onClose()
		} catch (error: any) {
			const errorMessage =
				(error as Error).message.replace(/^Error: /, '') ||
				'Could not complete registration'
			toast.error(errorMessage)
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
						<Title text='Registration' size='md' className='font-bold' />
						<p className='text-gray-400'>
							Fill in the form to create an account
						</p>
					</div>
				</div>

				<FormInput name='name' label='Name' required />
				<FormInput name='email' label='E-Mail' required />
				<FormInput name='password' label='Password' type='password' required />
				<FormInput
					name='confirmPassword'
					label='Confirm password'
					type='password'
					required
				/>

				<Button
					loading={form.formState.isSubmitting || isLoading}
					className='h-12 text-base'
					type='submit'
				>
					Sign up
				</Button>
			</form>
		</FormProvider>
	)
}
