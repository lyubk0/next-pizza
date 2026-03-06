'use server'

import { ChechoutFormValues } from '@/app/(checkout)/_components/schemas/checkout-form-schema'
import { findOrCreateCart, updateCartTotalAmount } from '@/lib'
import { getUserSession } from '@/lib/get-user-session'
import { prisma } from '@/prisma/prisma-client'
import { CreateCartItemValues } from '@/services/dto/cart'
import { OrderStatus, Prisma } from '@prisma/client'
import { cookies } from 'next/headers'
import { Stripe } from 'stripe'

export async function createOrder(data: ChechoutFormValues) {
	try {
		const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

		const cookieStore = cookies()
		const cartToken = (await cookieStore).get('cartToken')?.value
		if (!cartToken) {
			throw new Error('Cart does not exist')
		}
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		})

		if (!userCart) {
			throw new Error('Cart does not exist')
		}

		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty')
		}

		const price = await stripe.prices.create({
			currency: 'usd',
			unit_amount: userCart.totalAmount * 100,

			product_data: {
				name: 'Total:',
			},
		})

		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: `${data.firstName} ${data.lastName}`,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		})

		const paymentLink = await stripe.paymentLinks.create({
			line_items: [
				{
					price: price.id,
					quantity: 1,
				},
			],

			after_completion: {
				type: 'redirect',
				redirect: {
					url: `${process.env.NEXTAUTH_URL}/?paid`,
				},
			},

			metadata: {
				orderId: order.id,
			},
		})

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		return paymentLink.url
	} catch (error) {
		console.log('[CreateOrder] Sever error', error)
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			throw new Error('User not found')
		}

		await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				name: body.name,
				email: body.email,
			},
		})
	} catch (error) {
		console.log('[UpdateUserInfo] Server error', error)
	}
}

export async function addToCart(data: CreateCartItemValues) {
	try {
		const cookieStore = cookies()
		let token = (await cookieStore).get('cartToken')?.value
		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredients: { every: { id: { in: data.ingredientsIds } } },
			},
		})

		if (findCartItem) {
			const updatedCartItem = await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			})

			const updatedUserCart = await updateCartTotalAmount(token)

			return {
				cart: updatedUserCart,
				token: token,
			}
		}

		await prisma.cartItem.create({
			data: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				quantity: 1,
				ingredients: { connect: data.ingredientsIds?.map(id => ({ id })) },
			},
		})

		// Update cart
		const updatedUserCart = await updateCartTotalAmount(token)

		return {
			cart: updatedUserCart,
			token: token,
		}
	} catch (error) {
		console.log('[CART_POST] Server error', error)
		throw new Error('Failed to create cart')
	}
}
