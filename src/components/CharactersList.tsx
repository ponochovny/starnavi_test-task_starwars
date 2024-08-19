import { Link } from 'react-router-dom'
import { IPerson } from '../services/types'
import { cn } from '../lib/utils'

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
			<div
				className={cn(
					'relative bg-white px-4 py-8 sm:px-6 lg:px-8 rounded-xl border border-gray-200 transition-opacity',
					loading && 'opacity-60 pointer-events-none'
				)}
				data-testid='characters-list'
				{...restProps}
			>
				<div className='mx-auto max-w-4xl'>
					<ul role='list' className='divide-y divide-gray-100'>
						{list.map((person) => (
							<li className='hover:bg-gray-50 px-4 rounded-3xl transition-colors'>
								<Link
									to={`/person/${person.id}`}
									className='flex justify-between gap-x-6 py-5'
								>
									<div className='flex min-w-0 gap-x-4'>
										<img
											className='h-24 w-24 flex-none rounded-full bg-gray-50 object-cover object-top'
											src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
											alt=''
										/>
										<div className='min-w-0 flex-auto items-center flex'>
											<p className='text-xl font-semibold leading-6 text-gray-900'>
												{person.name}
											</p>
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>

				{loading && (
					<p
						data-testid='loading-state'
						className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
					>
						Loading...
					</p>
				)}
			</div>
		</>
	)
}
