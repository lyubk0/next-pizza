'use client'

import { RangeSlider, Title } from '@/components/shared'
import { Input } from '@/components/ui'
import { useFilters } from '@/hooks/use-filters'
import React from 'react'
import { CheckboxFiltersGroup } from './checkbox-filters-group'

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const {
		price,
		loading,
		selectedPizzaTypes,
		selectedSizes,
		selectedIngredients,
		updatePrice,
		togglePizzaTypes,
		toggleSize,
		toggleIngredient,
		getIngredientOptions,
	} = useFilters()

	return (
		<div className={className}>
			<Title text='Фільтрація' size='sm' className='mb-5 font-bold' />

			<CheckboxFiltersGroup
				name='pizzaTypes'
				className='mb-5'
				selectedValues={selectedPizzaTypes}
				title='Тип тіста'
				onClickCheckbox={togglePizzaTypes}
				items={[
					{ text: 'Тонке', value: '1' },
					{ text: 'Традиційне', value: '2' },
				]}
			/>

			<CheckboxFiltersGroup
				name='sizes'
				className='mb-5'
				selectedValues={selectedSizes}
				title='Розміри'
				onClickCheckbox={toggleSize}
				items={[
					{ text: 'Маленька', value: '25' },
					{ text: 'Середня', value: '30' },
					{ text: 'Велика', value: '40' },
				]}
			/>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Ціна від і до</p>

				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder={String(price.priceFrom || 0)}
						min={price.priceFrom || 0}
						max={price.priceTo || 1000}
						defaultValue={price.priceFrom}
						className='rounded-lg'
						onChange={e =>
							updatePrice(Number(e.target.value), price.priceTo || 1000)
						}
					/>
					<Input
						type='number'
						className='rounded-lg'
						placeholder={String(price.priceTo || 1000)}
						min={price.priceFrom || 0}
						max={price.priceTo || 1000}
						defaultValue={price.priceTo}
						onChange={e =>
							updatePrice(price.priceFrom || 0, Number(e.target.value))
						}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[price.priceFrom || 0, price.priceTo || 1000]}
					onValueChange={([priceFrom, priceTo]) =>
						updatePrice(priceFrom, priceTo)
					}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Інгредієнти'
				className='mt-5'
				limit={5}
				selectedValues={selectedIngredients}
				onClickCheckbox={toggleIngredient}
				defaultItems={getIngredientOptions()}
				loading={loading}
				items={getIngredientOptions()}
			/>
		</div>
	)
}
