import React from 'react';
import ReactPaginate from 'react-paginate';
import s from "./Pagination.module.scss";

type PaginationProps = {
	currentPage: number,
	onChangePage: (page: number) => void,
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => (
	<ReactPaginate
		className={s.root}
		breakLabel="..."
		previousLabel="<"
		nextLabel=">"
		onPageChange={(e) => onChangePage(e.selected + 1)}
		pageRangeDisplayed={4}
		pageCount={3}
		forcePage={currentPage - 1}
	/>
);