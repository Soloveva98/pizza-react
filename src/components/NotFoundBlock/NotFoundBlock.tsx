import React from "react";
import s from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => (
	<div className={s.main}>
		<h1>
			<span>😕</span>
			<br />
			Ничего не найдено :(
		</h1>
		<p className={s.desccription}>К сожалению данная страница отсутствует в нашем интернет-магазине</p>
	</div>
);