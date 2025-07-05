'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, Package, Truck } from 'lucide-react'
import React from 'react'
import { WhiteBlock } from '../../../components/shared/white-block'
import { Skeleton } from '../../../components/ui'
import { Button } from '../../../components/ui/button'

interface Props {
	className?: string
	totalAmount: number
	submitting?: boolean
	loading?: boolean
	disabled?: boolean
}

const DELIVERY_PRICE = 60

const sidebarVariants: Variants = {
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
		x: 20,
	},
}

const springTransition = {
	type: 'spring' as const,
	stiffness: 500,
	damping: 30,
	mass: 1,
}

const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 10,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
}

export const CheckoutSidebar: React.FC<Props> = ({
	totalAmount,
	loading,
	disabled,
	className,
}) => {
	return (
		<motion.div
			className='w-full md:w-[450px]'
			initial='hidden'
			animate='visible'
			exit='exit'
			variants={sidebarVariants}
			transition={{
				...springTransition,
				staggerChildren: 0.1,
				delayChildren: 0.2,
			}}
		>
			<WhiteBlock className='p-0 md:p-6 sticky top-4'>
				<motion.div
					className='flex flex-col gap-1'
					variants={itemVariants}
					transition={springTransition}
				>
					<span className='text-xl'>Всього:</span>

					{loading ? (
						<Skeleton className='w-48 h-11' />
					) : (
						<motion.span
							className='text-[34px] h-11 font-extrabold'
							key={totalAmount + DELIVERY_PRICE}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={springTransition}
						>
							{totalAmount + DELIVERY_PRICE} ₴
						</motion.span>
					)}
				</motion.div>

				<motion.div
					className='flex my-4'
					variants={itemVariants}
					transition={springTransition}
				>
					<span className='flex flex-1 text-lg text-neutral-500'>
						<span className='flex items-center'>
							<Package className='mr-2 text-gray-300' size={16} />
							Ціна корзини:
						</span>
						<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
					</span>

					{loading ? (
						<Skeleton className='w-16 h-6' />
					) : (
						<motion.span
							className='font-bold text-lg'
							key={totalAmount}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={springTransition}
						>
							{totalAmount} ₴
						</motion.span>
					)}
				</motion.div>

				<motion.div
					className='flex my-4'
					variants={itemVariants}
					transition={springTransition}
				>
					<span className='flex flex-1 text-lg text-neutral-500'>
						<span className='flex items-center'>
							<Truck className='mr-2 text-gray-300' size={16} />
							Доставка:
						</span>
						<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
					</span>
					{loading ? (
						<Skeleton className='w-16 rounded-[6px] h-6' />
					) : (
						<motion.span
							className='font-bold text-lg'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							{DELIVERY_PRICE} ₴
						</motion.span>
					)}
				</motion.div>

				<motion.div variants={itemVariants} transition={springTransition}>
					<Button
						loading={loading}
						disabled={disabled}
						type='submit'
						className='w-full h-14 text-base rounded-2xl mt-6 font-bold'
					>
						Перейти до оплати
						<ArrowRight className='w-5 ml-2' />
					</Button>
				</motion.div>
			</WhiteBlock>
		</motion.div>
	)
}
