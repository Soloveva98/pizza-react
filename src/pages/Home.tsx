import React, { useCallback, useEffect, useRef } from "react";
import qs from 'qs';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

import { selectFilter, setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";

import {Categories, PizzaBlock, Skeleton,Sort, Pagination } from "../components";



const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const isMounted = useRef(false);

	const { items, status } = useSelector(selectPizzas);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

	const onChangeCategory = useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				currentPage,
				sortBy,
				order,
				category,
				search
			}));

		window.scrollTo(0, 0);
	};

	// Если изменили параметры и был первый рендер
	// useEffect(() => {
	// 	if (isMounted.current) {
	// 		const params = {
	// 			sortProperty: sort.sortProperty,
	// 			categoryId: categoryId > 0 ? categoryId : null,
	// 			currentPage,
	// 		};

	// 		const queryString = qs.stringify(params, { skipNulls: true });

	// 		navigate(`/?${queryString}`);
	// 	}

	// 	if (window.location.search) {
	// 		dispatch(fetchPizzas({} as SearchPizzaParams));
	// 	}

	// }, [categoryId, sort.sortProperty, searchValue, currentPage]);

	useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, currentPage, searchValue]);

	//если был первый рендер, то парсим URL-параметры и сохраняем в редаксе
	// useEffect(() => {
	// 	if (window.location.search) {
	// 		const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
	// 		const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

	// 		dispatch(setFilters({
	// 			searchValue: params.search,
	// 			categoryId: Number(params.category),
	// 			currentPage: params.currentPage,
	// 			sort: sort || sortList[0],
	// 		}));

	// 		isMounted.current = true;
	// 	}
	// }, []);


	const pizzasItems = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...Array(4)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort sort={sort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{
				status === 'error' ? (
					<div className="content__error-info">
						<h2>Произошла ошибка 😕</h2>
						<p>К сожалению, не удалось получить питсы.<br />
							Попробуйте повторить попытку позже.</p>
					</div>
				) : (
					<div className="content__items">{status === 'loading' ? skeletons : pizzasItems}</div>
				)
			}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div >
	)
};

export default Home;



/*
// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage
			});

			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);


	//если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, currentPage, searchValue]);

	//если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort
				}),
			);

			isSearch.current = true;
		}
	}, []);

*/
