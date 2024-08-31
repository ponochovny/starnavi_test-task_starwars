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
			className='flex flex-col items-center justify-between gap-4 sm:flex-row'
			{...restProps}
		>
			<p data-testid='pagination-text'>
				Showing {(currentPage - 1) * 10 + 1} to{' '}
				{(currentPage - 1) * 10 + peopleShown} of {totalPeople} results
			</p>
			<div className='flex items-center gap-2'>
				<button
					onClick={() => setPage('prev')}
					disabled={currentPage === 1}
					className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-30'
				>
					{'<'}
				</button>
				Page {currentPage} of {totalPages}
				<button
					onClick={() => setPage('next')}
					disabled={currentPage === totalPages}
					className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-30'
				>
					{'>'}
				</button>
			</div>
		</div>
	)
}
