import { ApiRoutes } from './constants'
import { CartDTO, CreateCartItemValues } from './dto/cart'
import { axiosInstance } from './instance'

export const getCart = async () => {
	const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART)

	return data
}

export const updateItemQuantity = async (id: number, quantity: number) => {
	const { data } = await axiosInstance.patch('/api/cart/' + id, { quantity })
	return data
}

export const removeItem = async (id: number) => {
	const { data } = await axiosInstance.delete('/api/cart/' + id)
	return data
}

export const addCartItem = async (
	values: CreateCartItemValues,
): Promise<CartDTO> => {
	const { data } = await axiosInstance.post<CartDTO>('/api/cart', values)

	return data
}
