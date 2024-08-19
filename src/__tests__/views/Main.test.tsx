import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import MainPage from '../../views/Main'
import { BrowserRouter } from 'react-router-dom'

describe('Main page', () => {
	test('MainPage component', () => {
		render(
			<BrowserRouter>
				<MainPage />
			</BrowserRouter>
		)

		const heading = screen.getByTestId('heading')
		expect(heading).toBeInTheDocument()

		const CharactersCmp = screen.getByTestId('characters-component')
		expect(CharactersCmp).toBeInTheDocument()

		const PaginationCmp = screen.getByTestId('pagination-component')
		expect(PaginationCmp).toBeInTheDocument()
	})
})
