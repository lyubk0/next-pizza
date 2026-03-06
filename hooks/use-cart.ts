<<<<<<< HEAD
import { CreateCartItemValues } from "@/services/dto/cart";
import debounce from "lodash.debounce";
import { useCartStore } from "@/store/cart";
import React from "react";
import { CartStateItem } from "@/lib/get-cart-details";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (runFetch?: boolean): ReturnProps => {
  const [
    totalAmount,
    items,
    fetchCartItems,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  ] = useCartStore((state) => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
    state.loading,
    state.addCartItem,
    debounce(state.updateItemQuantity, 200),
    state.removeCartItem,
  ]);

  React.useEffect(() => {
    if (runFetch) {
      fetchCartItems();
    }
  }, []);

  return {
    totalAmount,
    items,
    loading,
    addCartItem,
    updateItemQuantity,
    removeCartItem,
  };
};
=======
import { CartStateItem } from '@/lib/get-cart-details'
import { CreateCartItemValues } from '@/services/dto/cart'
import { useCartStore } from '@/store/cart'
import debounce from 'lodash.debounce'
import React, { useMemo } from 'react'

type ReturnProps = {
	totalAmount: number
	items: CartStateItem[]
	loading: boolean
	updateItemQuantity: (id: number, quantity: number) => void
	removeCartItem: (id: number) => void
	addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (runFetch?: boolean): ReturnProps => {
	const totalAmount = useCartStore(state => state.totalAmount)
	const items = useCartStore(state => state.items)
	const fetchCartItems = useCartStore(state => state.fetchCartItems)
	const loading = useCartStore(state => state.loading)
	const addCartItem = useCartStore(state => state.addCartItem)
	const updateItemQuantity = useCartStore(state => state.updateItemQuantity)

	const debouncedUpdateItemQuantity = useMemo(
		() => debounce(updateItemQuantity, 200),
		[updateItemQuantity],
	)
	const removeCartItem = useCartStore(state => state.removeCartItem)

	React.useEffect(() => {
		if (runFetch) {
			fetchCartItems()
		}
	}, [])

	return {
		totalAmount,
		items,
		loading,
		addCartItem,
		updateItemQuantity,
		removeCartItem,
	}
}
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
