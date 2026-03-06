'use client'
import { Title } from '@/components/shared'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
<<<<<<< HEAD
import { AnimatePresence, motion } from 'framer-motion'
=======
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
import Link from 'next/link'
import React from 'react'
import { useIntersection } from 'react-use'
import { ProductCard } from './product-card'
<<<<<<< HEAD
import {
	productsAnimationVariants,
	productsContainerVariants,
} from './products-animations'
=======
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)

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
<<<<<<< HEAD
	const intersectionRef = React.useRef(null)
=======
	const intersectionRef = React.useRef<HTMLDivElement>(
		null,
	) as React.RefObject<HTMLDivElement>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
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
<<<<<<< HEAD
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
					'grid gap-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 relative',
					listClassName
				)}
				variants={productsContainerVariants}
				initial='hidden'
				animate='visible'
=======
			<Title text={title} size='lg' className='font-extrabold mb-3' />

			<div
				className={cn(
					'grid gap-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 relative',
					listClassName,
				)}
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
				style={{
					overflow: 'hidden',
				}}
			>
<<<<<<< HEAD
				<AnimatePresence mode='popLayout' initial>
					{products.map((product, index) => (
						<motion.div
							key={product.id}
							variants={productsAnimationVariants}
							layout='position'
							layoutId={`product-${product.id}`}
							transition={{
								layout: {
									type: 'spring',
									stiffness: 600,
									damping: 35,
									mass: 0.3,
								},
							}}
							style={{
								zIndex: 1,
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
=======
				{products.map((product, index) => (
					<div
						key={product.id}
						style={{
							zIndex: 1,
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
					</div>
				))}
			</div>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
		</div>
	)
}
