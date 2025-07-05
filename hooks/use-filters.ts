import { Api } from '@/services/api-client'
import { useQueryStore } from '@/store/query'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import { useEffect, useRef, useState } from 'react'
import { useInitializeFilters } from './use-initialize-filters'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

export type IngredientItem = {
	text: string
	id: number
}

export const useFilters = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const isMounted = useRef(false)
	const {
		selectedIngredients,
		selectedPizzaTypes,
		selectedSizes,
		toggleIngredient,
		togglePizzaTypes,
		toggleSize,
		sortBy,
	} = useQueryStore(state => state)

	const [ingredients, setIngredients] = useState<IngredientItem[]>([])
	const [price, setPrice] = useState<PriceProps>({})
	const [loading, setLoading] = useState(true)

	const updatePrice = (from: number, to: number) => {
		setPrice({ priceFrom: from, priceTo: to })
	}

	useEffect(() => {
		async function fetch() {
			setLoading(true)
			const data = await Api.ingredients.getAll()
			setIngredients(data.map(item => ({ text: item.name, id: item.id })))
			setLoading(false)
		}

		fetch()
	}, [])

	useEffect(() => {
		if (isMounted.current) {
			const filters = {
				...(sortBy !== 'asc' && { sortBy }),
				...(price.priceFrom !== 0 && { priceFrom: price.priceFrom }),
				...(price.priceTo !== 1000 && { priceTo: price.priceTo }),
				sizes: Array.from(selectedSizes),
				ingredients: Array.from(selectedIngredients),
				pizzaTypes: Array.from(selectedPizzaTypes),
			}

			const query = qs.stringify(filters, { arrayFormat: 'comma' })
			router.push(query ? `?${query}` : '/', { scroll: false })
		}
		isMounted.current = true
	}, [
		selectedSizes,
		selectedIngredients,
		selectedPizzaTypes,
		price,
		sortBy,
		router,
	])

	useInitializeFilters(setPrice)

	const getIngredientOptions = () =>
		ingredients?.map(o => ({ text: o.text, value: o.id.toString() })) || []

	return {
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
	}
}
