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
<<<<<<< HEAD
import { AnimatePresence, motion, Transition } from 'framer-motion'
=======
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DrawerCartItem } from './drawer-cart-item'

interface Props {
	className?: string
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

=======
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const [isAnimationReady, setIsAnimationReady] = React.useState(false)
<<<<<<< HEAD
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
=======
	const totalAmount = useCartStore(state => state.totalAmount)
	const fetchCartItems = useCartStore(state => state.fetchCartItems)
	const updateItemQuantity = useCartStore(state => state.updateItemQuantity)
	const removeCartItem = useCartStore(state => state.removeCartItem)
	const items = useCartStore(state => state.items)
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)

	React.useEffect(() => {
		fetchCartItems()
	}, [])

	React.useEffect(() => {
		if (isOpen) {
<<<<<<< HEAD
			// Задержка для полного открытия drawer'а
=======
			// Delay to allow the drawer to fully open
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
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
<<<<<<< HEAD
		type: 'plus' | 'minus'
=======
		type: 'plus' | 'minus',
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
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
<<<<<<< HEAD
						!totalAmount && 'justify-center'
=======
						!totalAmount && 'justify-center',
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
					)}
				>
					{totalAmount > 0 && (
						<SheetHeader>
							<SheetTitle>
<<<<<<< HEAD
								В корзині{' '}
								<span className='font-bold'>{items.length} товара</span>
=======
								In cart{' '}
								<span className='font-bold'>
									{items.length} item{items.length !== 1 ? 's' : ''}
								</span>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
							</SheetTitle>
						</SheetHeader>
					)}

					{totalAmount === 0 || !totalAmount ? (
<<<<<<< HEAD
						<motion.div
							initial='hidden'
							animate={isAnimationReady ? 'visible' : 'hidden'}
							variants={itemVariants}
							transition={springTransition}
							className='flex flex-col items-center justify-center w-72 mx-auto'
						>
=======
						<div className='flex flex-col items-center justify-center w-72 mx-auto'>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
							<Image
								src='/empty-box.png'
								alt='Empty cart'
								width={120}
								height={120}
							/>
							<Title
								size='sm'
<<<<<<< HEAD
								text='Корзина пуста'
								className='text-center font-bold my-2'
							/>
							<p className='text-center text-neutral-500 mb-5'>
								Додайте хоча б одну піццу, щоб зробити замовлення
=======
								text='Cart is empty'
								className='text-center font-bold my-2'
							/>
							<p className='text-center text-neutral-500 mb-5'>
								Add at least one pizza to place an order
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
							</p>

							<SheetClose>
								<Button size='lg' className='text-base'>
									<ArrowLeft className='mr-2' />
<<<<<<< HEAD
									Повернутися назад
								</Button>
							</SheetClose>
						</motion.div>
=======
									Go back
								</Button>
							</SheetClose>
						</div>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
					) : null}

					{totalAmount > 0 && (
						<>
							<div className='-mx-3 mt-5 overflow-x-hidden overflow-y-auto flex-1'>
<<<<<<< HEAD
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
=======
								{isAnimationReady && (
									<div className='mb-2 flex flex-col gap-5'>
										{items.map(item => (
											<div key={item.id}>
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
														item.pizzaSize as PizzaSize,
													)}
													onClickCountButton={onClickCountButton}
													onClickRemoveButton={() => removeCartItem(item.id)}
													quantity={item.quantity}
												/>
											</div>
										))}
									</div>
								)}
							</div>
							<SheetFooter className='-mx-6 bg-white p-8'>
								<div className='w-full'>
									<div className='flex mb-4'>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Total
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
										</span>

										<span className='font-bold text-lg'>${totalAmount}</span>
									</div>

									<Link href='/checkout'>
										<Button type='submit' className='w-full h-12 text-base'>
											Place order
											<ArrowRight className='w-5 ml-2' />
										</Button>
									</Link>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
