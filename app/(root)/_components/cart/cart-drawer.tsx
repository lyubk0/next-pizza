'use client'

import { Title } from '@/components/shared'
import { Button, Sheet } from '@/components/ui'
import {
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { PizzaSize, PizzaType } from '@/constanst/pizza'
import { getCartItemDetails, getCartItemInfo } from '@/lib'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { AnimatePresence, motion, Transition } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DrawerCartItem } from './drawer-cart-item'

interface Props {
	className?: string
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
		x: 20,
	},
	visible: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: -20,
	},
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [isAnimationReady, setIsAnimationReady] = React.useState(false)
	const [
		totalAmount,
		fetchCartItems,
		updateItemQuantity,
		removeCartItem,
		items,
	] = useCartStore(state => [
		state.totalAmount,
		state.fetchCartItems,
		state.updateItemQuantity,
		state.removeCartItem,
		state.items,
	])

	React.useEffect(() => {
		fetchCartItems()
	}, [])

	React.useEffect(() => {
		if (isOpen) {
			// Задержка для полного открытия drawer'а
			const timer = setTimeout(() => {
				setIsAnimationReady(true)
			}, 250)

			return () => {
				clearTimeout(timer)
			}
		} else {
			setIsAnimationReady(false)
		}
	}, [isOpen])

	const onClickCountButton = async (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		await updateItemQuantity(id, type === 'plus' ? quantity + 1 : quantity - 1)
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex w-full  flex-col justify-between pb-0 bg-[#f4f1ee]'>
				<div
					className={cn(
						'flex flex-col h-full',
						!totalAmount && 'justify-center'
					)}
				>
					{totalAmount > 0 && (
						<SheetHeader>
							<SheetTitle>
								В корзині{' '}
								<span className='font-bold'>{items.length} товара</span>
							</SheetTitle>
						</SheetHeader>
					)}

					{totalAmount === 0 || !totalAmount ? (
						<motion.div
							initial='hidden'
							animate={isAnimationReady ? 'visible' : 'hidden'}
							variants={itemVariants}
							transition={springTransition}
							className='flex flex-col items-center justify-center w-72 mx-auto'
						>
							<Image
								src='/empty-box.png'
								alt='Empty cart'
								width={120}
								height={120}
							/>
							<Title
								size='sm'
								text='Корзина пуста'
								className='text-center font-bold my-2'
							/>
							<p className='text-center text-neutral-500 mb-5'>
								Додайте хоча б одну піццу, щоб зробити замовлення
							</p>

							<SheetClose>
								<Button size='lg' className='text-base'>
									<ArrowLeft className='mr-2' />
									Повернутися назад
								</Button>
							</SheetClose>
						</motion.div>
					) : null}

					{totalAmount > 0 && (
						<>
							<div className='-mx-3 mt-5 overflow-x-hidden overflow-y-auto flex-1'>
								<AnimatePresence mode='popLayout'>
									{isAnimationReady && (
										<div className='mb-2 flex flex-col gap-5'>
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
													<DrawerCartItem
														id={item.id}
														imageUrl={item.imageUrl}
														description={item.description}
														name={item.name}
														price={item.price}
														details={
															item.ingredients
																? getCartItemDetails(item.ingredients)
																: ''
														}
														info={getCartItemInfo(
															'',
															item.pizzaType as PizzaType,
															item.pizzaSize as PizzaSize
														)}
														onClickCountButton={onClickCountButton}
														onClickRemoveButton={() => removeCartItem(item.id)}
														quantity={item.quantity}
													/>
												</motion.div>
											))}
										</div>
									)}
								</AnimatePresence>
							</div>
							<SheetFooter className='-mx-6 bg-white p-8'>
								<div className='w-full'>
									<motion.div
										className='flex mb-4'
										initial='hidden'
										animate={isAnimationReady ? 'visible' : 'hidden'}
										variants={itemVariants}
										transition={springTransition}
									>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Разом
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
										</span>

										<span className='font-bold text-lg'>{totalAmount} ₴</span>
									</motion.div>

									<motion.div
										initial='hidden'
										animate={isAnimationReady ? 'visible' : 'hidden'}
										variants={itemVariants}
										transition={springTransition}
									>
										<Link href='/checkout'>
											<Button type='submit' className='w-full h-12 text-base'>
												Оформити замовлення
												<ArrowRight className='w-5 ml-2' />
											</Button>
										</Link>
									</motion.div>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
