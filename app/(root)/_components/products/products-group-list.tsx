'use client'
import { Title } from '@/components/shared'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { useIntersection } from 'react-use'
import { ProductCard } from './product-card'
import {
	productsAnimationVariants,
	productsContainerVariants,
} from './products-animations'

interface Props {
	title: string
	products: any[]
	className?: string
	listClassName?: string
	categoryId: number
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

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setCategoryId(categoryId)
		}
	}, [intersection?.isIntersecting, categoryId, title, setCategoryId])

	if (products.length === 0) return null

	return (
		<div ref={intersectionRef} id={title} className={className}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					stiffness: 200,
					damping: 20,
				}}
			>
				<Title text={title} size='lg' className='font-extrabold mb-3' />
			</motion.div>

			<motion.div
				className={cn(
					'grid gap-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3',
					listClassName
				)}
				variants={productsContainerVariants}
				initial='hidden'
				animate='visible'
			>
				<AnimatePresence mode='popLayout'>
					{products.map((product, index) => (
						<motion.div
							key={product.id}
							variants={productsAnimationVariants}
							layout
							layoutId={`product-${product.id}`}
							transition={{
								layout: {
									type: 'spring',
									stiffness: 500,
									damping: 30,
									mass: 0.5,
								},
							}}
						>
							<Link scroll={false} href={`/product/${product.id}`}>
								<ProductCard
									id={product.id}
									name={product.name}
									price={product.items[0].price}
									ingredients={product.ingredients}
									description={product.description}
									imageUrl={product.imageUrl}
									className='w-full h-full'
								/>
							</Link>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}
