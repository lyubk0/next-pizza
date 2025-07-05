import { prisma } from '@/prisma/prisma-client'
import { CartItemDTO } from '@/services/dto/cart'
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'

export async function updateCartTotalAmount(cartToken: string) {
	const cart = await prisma.cart.findFirst({
		where: {
			token: cartToken,
		},
		include: {
			items: {
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					productItemId: true,
					cartId: true,
					quantity: true,
					description: true,
					productItem: {
						select: {
							id: true,
							price: true,
							product: {
								select: {
									id: true,
									name: true,
									imageUrl: true,
								},
							},
						},
					},
					ingredients: {
						select: {
							id: true,
							price: true,
							name: true,
						},
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	})

	if (!cart) return null

	const totalAmount = cart.items.reduce((acc, item) => {
		return acc + calcCartItemTotalPrice(item as CartItemDTO)
	}, 0)

	return await prisma.cart.update({
		where: {
			id: cart.id,
		},
		data: {
			totalAmount,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})
}
