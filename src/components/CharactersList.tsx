import { Link } from 'react-router-dom'
import { IPerson } from '../services/types'

export const CharactersList = ({
	list,
	loading,
	...restProps
}: {
	list: IPerson[]
	loading: boolean
}) => {
	if (!loading && !list.length)
		return <p data-testid='characteristics-list-no-results'>No results</p>

	return (
		<>
			<ul data-testid='characters-list' {...restProps}>
				{list.map((person) => (
					<li key={person.id}>
						<Link to={`/person/${person.id}`}>{person.name}</Link>
					</li>
				))}
			</ul>
			{loading && <p data-testid='loading-state'>Loading...</p>}
		</>
	)
}
