import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import PersonCard from '../../components/PersonCard'
import { dummyPerson } from '../../mocks'

describe('Person Card component', () => {
	test('should render component with image and description', () => {
		render(
			<PersonCard
				data={{ person: dummyPerson }}
				isConnectable={true}
				isTesting
			/>
		)

		const image = screen.getByTestId('person-card-image')
		const description = screen.getByTestId('person-card-description')

		expect(image).toBeInTheDocument()
		expect(description).toBeInTheDocument()
	})
})
