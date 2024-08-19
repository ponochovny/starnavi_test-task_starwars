import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPeople } from '../services'
import type { IPerson } from '../services/types'
import { CharactersList } from '../components/CharactersList'
import { Pagination } from '../components/Pagination'

const PER_PAGE = 10

function Main() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const [loading, setLoading] = useState<boolean>(true)
	const [people, setPeople] = useState<IPerson[]>([])
	const [totalPeople, setTotalPeople] = useState<number>(0)
	const [peopleShown, setPeopleShown] = useState<number>(0)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)

	function pagesCountHandler(data: {
		results: IPerson[]
		count: number
		next: string | null
		previous: string | null
	}) {
		const _totalPages = Math.ceil(data.count / PER_PAGE)
		setTotalPages(_totalPages)

		if (!data.previous) {
			setCurrentPage(1)
		} else {
			const next_page = data.next ? +data.next.split('page=')[1] : _totalPages
			setCurrentPage(!data.next ? next_page : next_page - 1)
		}
	}

	function setPage(direction: 'prev' | 'next') {
		if (loading) return

		if (direction === 'prev') {
			if (currentPage === 1) return

			navigate('/?page=' + (currentPage - 1))
		} else {
			if (currentPage === totalPages) return

			navigate('/?page=' + (currentPage + 1))
		}
	}

	const fetchData = useCallback((pageCount: number) => {
		setLoading(true)

		getPeople(pageCount)
			.then(({ data }) => {
				const { results } = data

				setPeople(results)
				setTotalPeople(data.count)
				setPeopleShown(data.results.length)
				pagesCountHandler(data)
			})
			.catch((error) => console.log(error))
			.finally(() => setLoading(false))
	}, [])

	useEffect(() => {
		const pageFromQuery = Number(searchParams.get('page')) || 1
		setCurrentPage(pageFromQuery)
		fetchData(pageFromQuery)
	}, [searchParams, fetchData])

	return (
		<div className='ml-4'>
			<h2 id='heading' data-testid='heading'>
				Characters list
			</h2>
			<CharactersList
				list={people}
				loading={loading}
				data-testid='characters-component'
			/>

			<Pagination
				setPage={setPage}
				currentPage={currentPage}
				peopleShown={peopleShown}
				totalPages={totalPages}
				totalPeople={totalPeople}
				data-testid='pagination-component'
			/>
		</div>
	)
}

export default Main
