export const Pagination = ({
	setPage,
	currentPage,
	totalPages,
	peopleShown,
	totalPeople,
	...restProps
}: {
	setPage: (val: 'prev' | 'next') => void
	currentPage: number
	totalPages: number
	peopleShown: number
	totalPeople: number
}) => {
	return (
		<div data-testid='pagination-block' {...restProps}>
			<button onClick={() => setPage('prev')} disabled={currentPage === 1}>
				{'<'}
			</button>
			<small data-testid='pagination-text'>
				Page {currentPage} of {totalPages} | Shown {peopleShown} | Total{' '}
				{totalPeople}
			</small>
			<button
				onClick={() => setPage('next')}
				disabled={currentPage === totalPages}
			>
				{'>'}
			</button>
		</div>
	)
}
