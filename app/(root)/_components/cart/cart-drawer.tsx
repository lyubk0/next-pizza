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
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DrawerCartItem } from './drawer-cart-item'

interface Props {
	className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const totalAmount = useCartStore(state => state.totalAmount)
	const fetchCartItems = useCartStore(state => state.fetchCartItems)
	const updateItemQuantity = useCartStore(state => state.updateItemQuantity)
	const removeCartItem = useCartStore(state => state.removeCartItem)
	const items = useCartStore(state => state.items)

	React.useEffect(() => {
		fetchCartItems()
	}, [])

	const onClickCountButton = async (
		id: number,
		quantity: number,
		type: 'plus' | 'minus',
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
						!totalAmount && 'justify-center',
					)}
				>
					{totalAmount > 0 && (
						<SheetHeader>
							<SheetTitle>
								In cart{' '}
								<span className='font-bold'>
									{items.length} item{items.length !== 1 ? 's' : ''}
								</span>
							</SheetTitle>
						</SheetHeader>
					)}

					{totalAmount === 0 || !totalAmount ? (
						<div className='flex flex-col items-center justify-center w-72 mx-auto'>
							<Image
								src='/empty-box.png'
								alt='Empty cart'
								width={120}
								height={120}
							/>
							<Title
								size='sm'
								text='Cart is empty'
								className='text-center font-bold my-2'
							/>
							<p className='text-center text-neutral-500 mb-5'>
								Add at least one pizza to place an order
							</p>

							<SheetClose>
								<Button size='lg' className='text-base'>
									<ArrowLeft className='mr-2' />
									Go back
								</Button>
							</SheetClose>
						</div>
					) : null}

					{totalAmount > 0 && (
						<>
							<div className='-mx-3 mt-5 overflow-x-hidden overflow-y-auto flex-1'>
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
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
