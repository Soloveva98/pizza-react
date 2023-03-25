import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { findCartItem } from '../../utils/findCartItem';

export type CartItem = {
	id: string;
	imageUrl: string;
	title: string;
	description: string[];
	price: number;
	size: number;
	type: string;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
	totalPrice,
	items,
};


export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = findCartItem(state.items, action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1
				});
			}

			state.totalPrice = calcTotalPrice(state.items);
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = findCartItem(state.items, action.payload);

			if (findItem) {
				findItem.count--;
				state.totalPrice -= findItem.price;
				if (findItem.count === 0) {
					state.items = state.items.filter(obj => obj !== findItem);
				}
			}
		},
		removeItem(state, action: PayloadAction<string>) {
			const findItem = findCartItem(state.items, action.payload);

			state.items = state.items.filter((obj) => obj.id !== action.payload);
			if (findItem) {
				state.totalPrice -= findItem.price * findItem.count;
			}
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;