import axios from 'axios'
import { IPerson, IFilm, IStarShip } from './types'

const BASE_URL = 'https://sw-api.starnavi.io'

export function getPeople(page_count: number = 1) {
	return axios.get<{
		results: IPerson[]
		count: number
		next: string | null
		previous: string | null
	}>(BASE_URL + `/people/?page=${page_count}`)
}

export function getPerson(person_id: number = 1) {
	return axios.get<IPerson>(BASE_URL + `/people/${person_id}`)
}

export function getFilm(film_id: number = 1) {
	return axios.get<IFilm>(BASE_URL + `/films/${film_id}`)
}

export function getStarShip(starship_id: number = 1) {
	return axios.get<IStarShip>(BASE_URL + `/starships/${starship_id}`)
}
