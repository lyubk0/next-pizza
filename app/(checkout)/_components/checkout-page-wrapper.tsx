'use client'

import { Title } from '@/components/shared'
import { useCart } from '@/hooks/use-cart'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { createOrder } from '@/app/actions'
import { authClient } from '@/lib/auth-client'
import toast from 'react-hot-toast'
import { CheckoutCart } from '../_components/checkout-cart'
import { CheckoutDeliveryInfo } from '../_components/checkout-delivery-info'
import { CheckoutPersonalInfo } from '../_components/checkout-personal-info'
import { CheckoutSidebar } from '../_components/checkout-sidebar'
import {
	ChechoutFormValues,
	checkoutFormSchema,
} from '../_components/schemas/checkout-form-schema'

interface Props {
	className?: string
}

export const CheckoutPageWrapper = ({ className }: Props) => {
	const [submitting, setSubmitting] = React.useState(false)
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
		useCart(true)

	const { data: session, isPending, error, refetch } = authClient.useSession()

	const form = useForm<ChechoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: session?.user.email,
			firstName: session?.user.name,
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	const onSubmit = async (data: ChechoutFormValues) => {
		if (items.length === 0) {
			toast.error('Add items to the cart to place an order')
			return
		}

		try {
			setSubmitting(true)

			const url = await createOrder(data)

			if (url) {
				location.href = url
			}
		} catch (error) {
			console.log(error)
			setSubmitting(false)

			toast.error('Failed to place the order')
		}
	}

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus',
	) => {
		updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1)
	}

	const isFormDisabled = loading || items.length === 0

	React.useEffect(() => {
		if (session) {
			form.reset({
				email: session.user.email,
				firstName: session.user.name,
				lastName: '',
				phone: '',
				address: '',
				comment: '',
			})
		}
	}, [session])
	return (
		<div>
			<Title
				text='Checkout'
				size='lg'
				className='font-extrabold mt-7 text-[36px]  mb-11'
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-10 md:flex-row'>
						{/* Left side */}
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							<CheckoutCart
								items={items}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								loading={loading}
							/>
							<CheckoutPersonalInfo
								className={
									isFormDisabled ? 'opacity-40 pointer-events-none' : ''
								}
							/>

							<CheckoutDeliveryInfo
								className={
									isFormDisabled ? 'opacity-40 pointer-events-none' : ''
								}
							/>
						</div>
						{/* Right side */}
						<CheckoutSidebar
							loading={loading || submitting}
							totalAmount={totalAmount}
							disabled={items.length === 0}
						/>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
