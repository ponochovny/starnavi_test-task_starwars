import { Handle, Position } from '@xyflow/react'
import { IPerson } from '../services/types/index.js'

function TextUpdaterNode({
	data,
	isConnectable,
	isTesting,
	...restProps
}: {
	data: { person: IPerson }
	isConnectable: boolean
	isTesting?: boolean
}) {
	const { person } = data

	return (
		<div
			className='block bg-white p-3 w-48 pb-5 rounded-lg shadow-md border border-gray-100'
			{...restProps}
		>
			<div className='flex gap-4'>
				<div
					data-testid='person-card-image'
					className='w-[50px] h-[50px] rounded-lg overflow-hidden'
				>
					<img
						src={`https://starwars-visualguide.com/assets/img/characters/${person?.id}.jpg`}
						alt={person.name}
						className='object-cover object-top w-full h-full'
					/>
				</div>
				<div
					data-testid='person-card-description'
					className='flex flex-col gap-0.5 text-xs'
				>
					<p className='font-bold text-base'>{person.name}</p>
					<p>Gender: {person.gender}</p>
					<p>Height: {person.height} inch</p>
					<p>Eye color: {person.eye_color}</p>
					<p>Hair color: {person.hair_color}</p>
					<p>Skin color: {person.skin_color}</p>
					<p>Homeworld: {person.homeworld}</p>
				</div>
			</div>
			{!isTesting && (
				<Handle
					type='source'
					position={Position.Bottom}
					id='a'
					isConnectable={isConnectable}
				/>
			)}
		</div>
	)
}

export default TextUpdaterNode
