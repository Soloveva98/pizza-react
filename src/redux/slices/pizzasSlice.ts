import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";
import { SortType } from './filterSlice';

export type PizzaItem = {
	id: string,
	imageUrl: string,
	title: string,
	price: number,
	sizes: number[],
	types: number[],
	rating: number,
	description: string[]
};

export type SearchPizzaParams = {
	currentPage: number;
	sortBy: string;
	order: string;
	category: string;
	search: string;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
};

interface PizzasSliceState {
	items: PizzaItem[];
	status: Status;
};


export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
	const { currentPage, sortBy, order, category, search } = params;
	const { data } = await axios.get<PizzaItem[]>(`https://63ecee6d31ef61473b2c83ce.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

	return data;
});



const initialState: PizzasSliceState = {
	items: [],
	status: Status.LOADING, // loading | success | error
};

export const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
	// extraReducers: {
	// 	[fetchPizzas.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'success';
	// 	},
	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	},
	// },
});

export const selectPizzas = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;