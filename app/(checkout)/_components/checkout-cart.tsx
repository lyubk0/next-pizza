import { PizzaSize, PizzaType } from '@/constanst/pizza'
import { getCartItemDetails, getCartItemInfo } from '@/lib'
import { CartStateItem } from '@/lib/get-cart-details'
import { AnimatePresence, motion, Transition } from 'framer-motion'
import React from 'react'
import { CartItem } from '../../(root)/_components/cart/cart-item'
import { CartItemSkeleton } from '../../(root)/_components/cart/cart-item-skeleton'
import { WhiteBlock } from '../../../components/shared/white-block'

type Props = {
	className?: string
	items: CartStateItem[]
	onClickCountButton: (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => void
	removeCartItem: (id: number) => void
	loading?: boolean
}

const springTransition: Transition = {
	type: 'spring',
	stiffness: 500,
	damping: 30,
	mass: 1,
}

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: -20,
	},
}

export const CheckoutCart: React.FC<Props> = ({
	items,
	removeCartItem,
	onClickCountButton,
	loading,
	className,
}) => {
	return (
		<WhiteBlock title='1. Корзина' className={className}>
			<div className='flex flex-col gap-5'>
				{loading && items.length === 0 ? (
					<div className='flex flex-col gap-5'>
						{[...Array(4)].map((_, i) => (
							<CartItemSkeleton key={i} />
						))}
					</div>
				) : items.length === 0 ? (
					<motion.div
						initial='hidden'
						animate='visible'
						variants={itemVariants}
						transition={springTransition}
						className='flex flex-col items-center justify-center py-8 text-center'
					>
						<p className='text-lg font-medium text-gray-600'>
							Ваша корзина пуста
						</p>
						<p className='text-sm text-gray-500 mt-2'>
							Додайте товари до корзини, щоб продовжити оформлення замовлення
						</p>
					</motion.div>
				) : (
					<AnimatePresence mode='popLayout'>
						{items.map(item => (
							<motion.div
								key={item.id}
								layout
								initial='hidden'
								animate='visible'
								exit='exit'
								variants={itemVariants}
								transition={springTransition}
							>
								<CartItem
									id={item.id}
									name={item.name}
									imageUrl={item.imageUrl}
									price={item.price}
									quantity={item.quantity}
									details={getCartItemDetails(
										item.ingredients ? item.ingredients : []
									)}
									info={getCartItemInfo(
										'',
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize
									)}
									onClickCountButton={(type: 'plus' | 'minus') =>
										onClickCountButton(item.id, item.quantity, type)
									}
									onClickRemoveButton={() => removeCartItem(item.id)}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				)}
			</div>
		</WhiteBlock>
	)
}
