import { PizzaSize, PizzaType } from '@/constanst/pizza'
import { getCartItemDetails, getCartItemInfo } from '@/lib'
import { CartStateItem } from '@/lib/get-cart-details'
<<<<<<< HEAD
import { AnimatePresence, motion, Transition } from 'framer-motion'
=======
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
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
<<<<<<< HEAD
		type: 'plus' | 'minus'
=======
		type: 'plus' | 'minus',
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
	) => void
	removeCartItem: (id: number) => void
	loading?: boolean
}

<<<<<<< HEAD
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

=======
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
export const CheckoutCart: React.FC<Props> = ({
	items,
	removeCartItem,
	onClickCountButton,
	loading,
	className,
}) => {
	return (
<<<<<<< HEAD
		<WhiteBlock title='1. Корзина' className={className}>
=======
		<WhiteBlock title='1. Cart' className={className}>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
			<div className='flex flex-col gap-5'>
				{loading && items.length === 0 ? (
					<div className='flex flex-col gap-5'>
						{[...Array(4)].map((_, i) => (
							<CartItemSkeleton key={i} />
						))}
					</div>
				) : items.length === 0 ? (
<<<<<<< HEAD
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
=======
					<div className='flex flex-col items-center justify-center py-8 text-center'>
						<p className='text-lg font-medium text-gray-600'>
							Your cart is empty
						</p>
						<p className='text-sm text-gray-500 mt-2'>
							Add items to your cart to continue with checkout
						</p>
					</div>
				) : (
					<div className='flex flex-col gap-5'>
						{items.map(item => (
							<div key={item.id}>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
								<CartItem
									id={item.id}
									name={item.name}
									imageUrl={item.imageUrl}
									price={item.price}
									quantity={item.quantity}
									details={getCartItemDetails(
<<<<<<< HEAD
										item.ingredients ? item.ingredients : []
=======
										item.ingredients ? item.ingredients : [],
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
									)}
									info={getCartItemInfo(
										'',
										item.pizzaType as PizzaType,
<<<<<<< HEAD
										item.pizzaSize as PizzaSize
=======
										item.pizzaSize as PizzaSize,
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
									)}
									onClickCountButton={(type: 'plus' | 'minus') =>
										onClickCountButton(item.id, item.quantity, type)
									}
									onClickRemoveButton={() => removeCartItem(item.id)}
								/>
<<<<<<< HEAD
							</motion.div>
						))}
					</AnimatePresence>
=======
							</div>
						))}
					</div>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
				)}
			</div>
		</WhiteBlock>
	)
}
