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
		<div
			data-testid='pagination-block'
			className='flex gap-4 items-center justify-between'
			{...restProps}
		>
			<p data-testid='pagination-text'>
				Showing {(currentPage - 1) * 10 + 1} to{' '}
				{(currentPage - 1) * 10 + peopleShown} of {totalPeople} results
			</p>
			<div className='flex gap-2 items-center'>
				<button
					onClick={() => setPage('prev')}
					disabled={currentPage === 1}
					className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30'
				>
					{'<'}
				</button>
				Page {currentPage} of {totalPages}
				<button
					onClick={() => setPage('next')}
					disabled={currentPage === totalPages}
					className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-30'
				>
					{'>'}
				</button>
			</div>
		</div>
	)
}
