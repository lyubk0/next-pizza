import { calcCartItemTotalPrice } from '@/lib/calc-cart-item-total-price'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = Number((await params).id)

		if (isNaN(id)) {
			return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 })
		}

		const data = await req.json()

		if (!data || typeof data.quantity !== 'number') {
			return NextResponse.json(
				{ error: 'Invalid request body' },
				{ status: 400 }
			)
		}

		const token = req.cookies.get('cartToken')?.value

		if (!token || token.trim() === '') {
			return NextResponse.json(
				{ error: 'Cart token not found or is invalid' },
				{ status: 404 }
			)
		}

		// Execute all operations in a single transaction
		const result = await prisma.$transaction(async tx => {
			const cartItem = await tx.cartItem.findFirst({
				where: { id },
				include: {
					cart: true,
				},
			})

			if (!cartItem) {
				throw new Error('Cart item not found')
			}

			// Update item quantity
			await tx.cartItem.update({
				where: { id },
				data: { quantity: data.quantity },
			})

			// Get all cart items and calculate new total
			const allCartItems = await tx.cartItem.findMany({
				where: { cartId: cartItem.cartId },
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

			// Update cart with new total and return full cart data
			return await tx.cart.update({
				where: { id: cartItem.cartId },
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
		})

		return NextResponse.json(result)
	} catch (error) {
		console.error('[CART_PATCH] Server error', error)
		if (error instanceof Error && error.message === 'Cart item not found') {
			return NextResponse.json(
				{ error: 'Cart item not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json(
			{ message: 'Не вдалось оновити корзину' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = Number((await params).id)

		if (isNaN(id)) {
			return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 })
		}

		const token = req.cookies.get('cartToken')?.value

		if (!token || token.trim() === '') {
			return NextResponse.json(
				{ error: 'Cart token not found or is invalid' },
				{ status: 404 }
			)
		}

		// Execute all operations in a single transaction
		const result = await prisma.$transaction(async tx => {
			const cartItem = await tx.cartItem.findFirst({
				where: { id },
				include: {
					cart: true,
				},
			})

			if (!cartItem) {
				throw new Error('Cart item not found')
			}

			// Delete the item
			await tx.cartItem.delete({
				where: { id },
			})

			// Get remaining cart items and calculate new total
			const allCartItems = await tx.cartItem.findMany({
				where: { cartId: cartItem.cartId },
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

			// Update cart with new total and return full cart data
			return await tx.cart.update({
				where: { id: cartItem.cartId },
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
		})

		return NextResponse.json(result)
	} catch (error) {
		console.error('[CART_DELETE] Server error', error)
		if (error instanceof Error && error.message === 'Cart item not found') {
			return NextResponse.json(
				{ error: 'Cart item not found' },
				{ status: 404 }
			)
		}
		return NextResponse.json(
			{ message: 'Не вдалось оновити корзину' },
			{ status: 500 }
		)
	}
}
