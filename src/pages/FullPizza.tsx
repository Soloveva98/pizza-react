import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem, CartItem } from '../redux/slices/cartSlice';


const typeNames: string[] = ["тонкое", "традиционное"];

const FullPizza: React.FC = () => {

	const [pizza, setPizza] = useState<{
		id: string;
		imageUrl: string;
		title: string;
		description: string[];
		price: number;
		sizes: number[];
		types: number[];
	}>();

	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [activeType, setActiveType] = useState(0);
	const [activeSize, setActiveSize] = useState(0);


	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://63ecee6d31ef61473b2c83ce.mockapi.io/pizzas/' + id);
				setPizza(data);
			} catch (error) {
				console.log(error);
				alert('Ошибка при получении пиццы');
				navigate('/');
			}
		}

		fetchPizza();
	}, []);


	if (!pizza) {
		return <p className="load">Загрузка...</p>
	}


	const onClickAdd = () => {
		const item: CartItem = {
			id: pizza.id,
			title: pizza.title,
			price: pizza.price,
			imageUrl: pizza.imageUrl,
			type: typeNames[activeType],
			size: pizza.sizes[activeSize],
			description: [],
			count: 0,
		};

		dispatch(addItem(item));
	};

	return (
		<div className="content">
			<div className="pizza">
				<img className="pizza__img" src={pizza.imageUrl} />

				<div>
					<h2>{pizza.title}</h2>
					<p>Состав:</p>
					<ul className="pizza__compound">
						{
							pizza.description.map((item, i) => {
								return <li key={i}>{item}</li>
							})
						}
					</ul>
					<div className="pizza-block__selector">
						<ul>
							{
								pizza.types.map((typeId) => (
									<li key={typeId} onClick={() => setActiveType(typeId)} className={activeType === typeId ? "active" : ""}>
										{typeNames[typeId]}
									</li>
								))
							}
						</ul>
						<ul>
							{
								pizza.sizes.map((size, i) => (
									<li key={i} onClick={() => setActiveSize(i)} className={activeSize === i ? "active" : ""}>
										{size} см.
									</li>
								))
							}
						</ul>
					</div>



					<div className="pizza-block__bottom">
						<div className="pizza-block__price">от {pizza.price} ₽</div>
						<button onClick={onClickAdd} className="button button--outline button--add">
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
									fill="white" />
							</svg>
							<span>Добавить</span>
						</button>
					</div>



				</div>

			</div>

		</div>
	)
};


export default FullPizza;