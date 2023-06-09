import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}

export type SortType = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: SortType;
};

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: "популярности (DESC)",
		sortProperty: SortPropertyEnum.RATING_DESC,
	},
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			// state.currentPage = Number(action.payload.currentPage);
			// state.sort = action.payload.sort;
			// state.categoryId = Number(action.payload.categoryId);
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage);
				state.categoryId = Number(action.payload.categoryId);
				state.sort = action.payload.sort;
			} else {
				state.currentPage = 1;
				state.categoryId = 0;
				state.sort = {
					name: 'популярности',
					sortProperty: SortPropertyEnum.RATING_DESC,
				};
			}
		},
	},
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;