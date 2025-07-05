import { findOrCreateCart } from '@/lib'
import { calcCartItemTotalPrice } from '@/lib/calc-cart-item-total-price'
import { prisma } from '@/prisma/prisma-client'
import { CreateCartItemValues } from '@/services/dto/cart'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value
		if (!token) {
			return NextResponse.json({ items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: { token },
			include: {
				items: {
					orderBy: { createdAt: 'desc' },
					include: {
						productItem: {
							include: { product: true },
						},
						ingredients: true,
					},
				},
			},
		})

		return NextResponse.json(userCart)
	} catch (error) {
		console.log('[CART_GET] Server error')
		return NextResponse.json(
			{ message: 'Не вдалось отримати корзину' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)
		const data = (await req.json()) as CreateCartItemValues

		// Find existing cart item or create new one in a single transaction
		const result = await prisma.$transaction(async tx => {
			const existingItem = await tx.cartItem.findFirst({
				where: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					ingredients: { every: { id: { in: data.ingredientsIds } } },
				},
				include: {
					productItem: {
						include: { product: true },
					},
					ingredients: true,
				},
			})

			let cartItem
			if (existingItem) {
				cartItem = await tx.cartItem.update({
					where: { id: existingItem.id },
					data: { quantity: existingItem.quantity + 1 },
					include: {
						productItem: {
							include: { product: true },
						},
						ingredients: true,
					},
				})
			} else {
				cartItem = await tx.cartItem.create({
					data: {
						cartId: userCart.id,
						productItemId: data.productItemId,
						quantity: 1,
						ingredients: { connect: data.ingredientsIds?.map(id => ({ id })) },
					},
					include: {
						productItem: {
							include: { product: true },
						},
						ingredients: true,
					},
				})
			}

			// Calculate new total
			const allCartItems = await tx.cartItem.findMany({
				where: { cartId: userCart.id },
				include: {
					productItem: {
						include: { product: true },
					},
					ingredients: true,
				},
			})

			const totalAmount = allCartItems.reduce(
				(acc, item) => acc + calcCartItemTotalPrice(item),
				0
			)

			// Update cart with new total
			const updatedCart = await tx.cart.update({
				where: { id: userCart.id },
				data: { totalAmount },
				include: {
					items: {
						orderBy: { createdAt: 'desc' },
						include: {
							productItem: {
								include: { product: true },
							},
							ingredients: true,
						},
					},
				},
			})

			return updatedCart
		})

		const resp = NextResponse.json(result)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (error) {
		console.log('[CART_POST] Server error', error)
		return NextResponse.json(
			{ message: 'Не вдалось створити корзину' },
			{ status: 500 }
		)
	}
}
