'use client'
import { Title } from '@/components/shared'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import { Product as PrismaProduct } from '@prisma/client'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useIntersection } from 'react-use'
import { AnimatedProductCard } from './animated-product-card'
import { ProductCard } from './product-card'

interface Product extends PrismaProduct {
	items?: any[]
	ingredients?: any[]
}

interface Props {
	title: string
	products: Product[]
	className?: string
	listClassName?: string
	categoryId: number
}

const containerVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.98,
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
			type: 'spring',
			stiffness: 100,
			damping: 20,
			mass: 1,
		},
	},
}

const gridVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 150,
			damping: 25,
		},
	},
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	products,
	listClassName,
	categoryId,
	className,
}) => {
	const setCategoryId = useCategoryStore(state => state.setActiveId)
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.5,
	})
	const [visibleProducts, setVisibleProducts] = useState(products)

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setCategoryId(categoryId)
		}
	}, [intersection?.isIntersecting, categoryId, title, setCategoryId])

	useEffect(() => {
		setVisibleProducts(products)
	}, [products])

	if (products.length === 0) return null

	return (
		<motion.div
			initial='hidden'
			animate='show'
			variants={containerVariants}
			id={`category-${categoryId}`}
			layout='preserve-aspect'
			className={className}
		>
			<Title text={title} size='lg' className='font-extrabold mb-3' />

			<motion.div
				className={cn(
					'grid gap-5 grid-cols-1 xs:grid-cols-2  md:grid-cols-3 ',
					listClassName
				)}
				variants={gridVariants}
				layout='preserve-aspect'
			>
				<AnimatePresence initial={false} mode='sync'>
					{visibleProducts.map((product, index) => (
						<motion.div
							key={product.id}
							layout='position'
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							transition={{
								type: 'spring',
								stiffness: 200,
								damping: 25,
							}}
						>
							<AnimatedProductCard index={index}>
								<Link
									className='flex justify-between'
									scroll={false}
									href={`/product/${product.id}`}
								>
									<ProductCard
										key={product.id}
										id={product.id}
										name={product.name}
										price={product.items?.[0]?.price ?? product.price}
										ingredients={product.ingredients}
										description={product.description || undefined}
										imageUrl={product.imageUrl}
										className='w-full'
									/>
								</Link>
							</AnimatedProductCard>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	)
}
