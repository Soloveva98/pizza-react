import React, { memo } from 'react';

type CategoriesProps = {
	value: number;
	onChangeCategory: (idx: number) => void;
};

const categoriesPizzas: string[] = [
	"Все",
	"Мясные",
	"Вегетарианские",
	"Гриль",
	"Острые",
	"Закрытые"
];



export const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => (
	<div className="categories">
		<ul>
			{
				categoriesPizzas.map((category, i) => (
					<li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
						{category}
					</li>
				))
			}
		</ul>
	</div>
));