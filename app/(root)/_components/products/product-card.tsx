import { Button } from '@/components/ui'
import { getCartItemDetails } from '@/lib'
import { cn } from '@/lib/utils'
import { Ingredient } from '@prisma/client'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
export interface ProductProps {
	id: number
	name: string
	price: number
	ingredients?: Ingredient[]
	description?: string
	imageUrl: string
	className?: string
}

export const ProductCard: React.FC<ProductProps> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	description,
	className,
}) => {
	return (
		<div className={cn(className, 'flex [flex-flow:column] justify-between')}>
			<div>
<<<<<<< HEAD
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
=======
				<div className='flex justify-center p-6 bg-secondary/40 rounded-lg h-[260px]'>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
					<Image
						src={imageUrl}
						alt={name}
						width={215}
						height={215}
						className='w-full h-auto max-w-[215px] max-h-[215px] object-contain'
					/>
				</div>
				<h1 className='mb-1 mt-3 font-bold text-[20px]'>{name}</h1>
				<p className='text-sm text-gray-400 '>
					{ingredients ? getCartItemDetails(ingredients) : ''}
					{description}
				</p>
			</div>

			<div>
				<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
<<<<<<< HEAD
						від <b>{price} ₴</b>
=======
						from <b>${price}</b>
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
					</span>

					<Button variant='secondary' className='text-base font-bold'>
						<Plus size={20} className=' mr-1' />
<<<<<<< HEAD
						Додати
=======
						Add
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
					</Button>
				</div>
			</div>
		</div>
	)
}
