import { Background, Controls, ReactFlow } from '@xyflow/react'
import type { Edge, Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useCallback, useEffect, useState } from 'react'
import { getFilm, getPerson, getStarShip } from '../services/index.js'
import { useNavigate, useParams } from 'react-router-dom'
import { IFilm, IPerson, IStarShip } from '../services/types/index'
import { AxiosResponse } from 'axios'
import PersonCard from '../components/PersonCard'

const PERSON_NODE_ID = 'person'
const nodeTypes = { personCard: PersonCard }

const SinglePerson = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [person, setPerson] = useState<IPerson | null>(null)
	const [nodes, setNodes] = useState<Node[]>([])
	const [edges, setEdges] = useState<Edge[]>([])
	const [show, setShow] = useState<boolean>(false)

	function createNode({
		id,
		type,
		position,
		data,
		parentId,
		extent,
		style,
	}: Node) {
		setNodes((prev) => [
			...prev,
			{
				id,
				type,
				position,
				data,
				parentId,
				extent,
				style,
			},
		])
	}
	function createEdge({ id, source, target, data, label }: Edge) {
		setEdges((prev) => [
			...prev,
			{
				id,
				source,
				target,
				data,
				label,
			},
		])
	}
	function createPersonNode(person: IPerson, filmsGroupWidth: number) {
		createNode({
			id: PERSON_NODE_ID,
			type: 'personCard',
			position: {
				x: filmsGroupWidth / 2 - 87,
				y: -150,
			},
			data: { person },
		})
	}
	function createFilmsGroupNode(width: number) {
		setNodes((prev) => [
			...prev,
			{
				id: 'Films',
				type: 'output',
				position: { x: 20, y: 100 },
				data: { label: '' },
				style: {
					width,
					height: 80,
					backgroundColor: 'rgba(240,240,240,0.25)',
				},
			},
		])
	}

	function handleFilmShipsData(
		filmData: IFilm,
		filmShipsData: AxiosResponse<IStarShip>[],
		idx: number
	) {
		console.log('filmShipsData', filmShipsData)

		createNode({
			id: 'film-' + filmData.title,
			type: 'output',
			position: { x: 20 + 200 * idx, y: 220 },
			data: { label: '' },
			style: {
				width: 190,
				height: 80 * (1 * filmShipsData.length),
				backgroundColor: 'rgba(240,240,240,0.25)',
			},
		})

		filmShipsData.forEach(
			({ data: { id: film_ship_id, name: film_ship_name } }, _idx) => {
				createNode({
					id: 'starship-' + film_ship_id + '-' + idx,
					type: 'input',
					position: {
						x: 20,
						y: 20 + 60 * _idx,
					},
					data: { label: film_ship_name },
					parentId: 'film-' + filmData.title,
					extent: 'parent',
				})
			}
		)
	}
	async function handlePersonFilms(
		films: IPerson['films'],
		starships: IPerson['starships']
	) {
		try {
			const filmsPromises = films.map((film_id) => getFilm(film_id))
			const result = await Promise.all(filmsPromises)
			result.forEach(async ({ data: filmData }: { data: IFilm }, idx) => {
				console.log('film', idx, filmData)

				createNode({
					id: 'film-' + filmData.id + '-' + idx,
					type: 'input',
					position: { x: 20 + 180 * idx, y: 20 },
					data: { label: filmData.title },
					parentId: 'Films',
					extent: 'parent',
				})

				const personsShipsInFilm = filmData.starships.filter((film_ship_id) =>
					starships.includes(film_ship_id)
				)
				const filmShipsPromises = personsShipsInFilm.map((ship_id) =>
					getStarShip(ship_id)
				)
				const filmShipsData = await Promise.all(filmShipsPromises)

				createEdge({
					id: 'film-' + filmData.id + '-' + idx,
					source: 'film-' + filmData.id + '-' + idx,
					target: 'film-' + filmData.title,
					label: filmShipsData.length > 1 ? 'Ships' : 'Ship',
				})

				if (filmShipsData.length) {
					handleFilmShipsData(filmData, filmShipsData, idx)
				}

				setShow(true)
			})
		} catch (error) {
			alert(JSON.stringify(error))
		}
	}
	function handlePersonDataSuccess(data: IPerson) {
		const filmsGroupWidth =
			20 + 150 * data.films.length + (30 * data.films.length - 1)

		setPerson(data)
		createPersonNode(data, filmsGroupWidth)

		if (data.films.length) {
			createFilmsGroupNode(filmsGroupWidth)
			createEdge({
				id: PERSON_NODE_ID,
				source: PERSON_NODE_ID,
				target: 'Films',
				label: data.films.length > 1 ? 'Films' : 'Film',
			})

			handlePersonFilms(data.films, data.starships)
		}
	}

	const fetchData = useCallback((id: number) => {
		getPerson(id)
			.then(({ data }) => handlePersonDataSuccess(data))
			.catch((error) => alert(JSON.stringify(error)))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (id) fetchData(+id)
	}, [fetchData, id])

	if (!id) return null

	const reactFlowView = () => (
		<div style={{ width: '80%', height: '600px' }}>
			<div
				style={{
					height: '100%',
					boxShadow: '0px 10px 15px #b8b8b8',
					borderRadius: '20px',
					border: '1px solid #e0e0e0',
				}}
			>
				<ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	)

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				gap: '16px',
				paddingBottom: '40px',
			}}
		>
			<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
				<button onClick={() => navigate(-1)}>{'<<'}</button>
				<h1>{person?.name}</h1>
			</div>
			{show && reactFlowView()}
		</div>
	)
}

export default SinglePerson
