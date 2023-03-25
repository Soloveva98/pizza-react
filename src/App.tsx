import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import Home from "./pages/Home";

import './scss/app.scss';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));


//https://63ecee6d31ef61473b2c83ce.mockapi.io/pizzas

function App() {

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route path="" element={<Home />} />
					<Route
						path="cart"
						element={
							<Suspense fallback={<div>Идет загрузка корзины...</div>}>
								<Cart />
							</Suspense>
						}
					/>
					<Route
						path="pizza/:id"
						element={
							<Suspense>
								<FullPizza />
							</Suspense>
						}
					/>
					<Route
						path="*"
						element={
							<Suspense>
								<NotFound />
							</Suspense>
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;