'use client'
import { Title } from '@/components/shared'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import Link from 'next/link'
import React from 'react'
import { useIntersection } from 'react-use'
import { ProductCard } from './product-card'

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
	const intersectionRef = React.useRef<HTMLDivElement>(
		null,
	) as React.RefObject<HTMLDivElement>
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
			<Title text={title} size='lg' className='font-extrabold mb-3' />

			<div
				className={cn(
					'grid gap-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 relative',
					listClassName,
				)}
				style={{
					overflow: 'hidden',
				}}
			>
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
		</div>
	)
}
