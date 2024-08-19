import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pagination } from '../../components/Pagination'

describe('Pagination component', () => {
	test('should render component', () => {
		const setPage = () => {}
		const currentPage = 1
		const totalPages = 1
		const peopleShown = 0
		const totalPeople = 0

		render(
			<Pagination
				setPage={setPage}
				currentPage={currentPage}
				totalPages={totalPages}
				peopleShown={peopleShown}
				totalPeople={totalPeople}
			/>
		)

		const cmp = screen.getByTestId('pagination-block')
		expect(cmp).toBeInTheDocument()
	})
})
