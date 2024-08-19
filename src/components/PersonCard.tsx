import { Handle, Position } from '@xyflow/react'
import { IPerson } from '../services/types/index.js'

function PersonCard({
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
			className='text-updater-node'
			style={{ width: '180px', padding: '16px', paddingBottom: '20px' }}
			{...restProps}
		>
			<div style={{ display: 'flex', gap: '16px' }}>
				<div
					data-testid='person-card-image'
					style={{
						width: '50px',
						height: '50px',
						borderRadius: '8px',
						overflow: 'hidden',
					}}
				>
					<img
						src={`https://starwars-visualguide.com/assets/img/characters/${person?.id}.jpg`}
						alt={person.name}
						style={{
							objectFit: 'cover',
							objectPosition: 'top',
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
				<div
					data-testid='person-card-description'
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '2px',
						fontSize: '12px',
					}}
				>
					<p style={{ fontWeight: 'bold', fontSize: '16px' }}>{person.name}</p>
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

export default PersonCard
