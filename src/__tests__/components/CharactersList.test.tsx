import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CharactersList } from '../../components/CharactersList.js'
import { BrowserRouter } from 'react-router-dom'
import { dummyPerson } from '../../mocks'

describe('Characters List component', () => {
	test('should render component with data', () => {
		render(
			<BrowserRouter>
				<CharactersList list={[dummyPerson]} loading={false} />
			</BrowserRouter>
		)

		const charactersList = screen.getByTestId('characters-list')
		expect(charactersList).toBeInTheDocument()
	})

	test('should render component with loading state', () => {
		render(
			<BrowserRouter>
				<CharactersList list={[]} loading={true} />
			</BrowserRouter>
		)

		const loadingState = screen.getByTestId('loading-state')
		expect(loadingState).toBeInTheDocument()
	})

	test('should render component with no results state', () => {
		render(
			<BrowserRouter>
				<CharactersList list={[]} loading={false} />
			</BrowserRouter>
		)

		const noResultsState = screen.getByTestId('characteristics-list-no-results')
		expect(noResultsState).toBeInTheDocument()
	})
})
