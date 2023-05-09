import { PeopleResponse, PersonDetailsResponse } from "../types";

export const getPeople = async (page: number): Promise<PeopleResponse | null> => {
	try {
		const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
		const data = await response.json();
		return data as PeopleResponse;
	} catch (error) {
		console.error("Error fetching people data:", error);
		return null;
	}
};

export const getPersonDetails = async (id: string): Promise<PersonDetailsResponse | null> => {
	try {
		const response = await fetch(`https://swapi.dev/api/people/${id}`);
		const data = await response.json();
		return data as PersonDetailsResponse;
	} catch (error) {
		console.error("Error fetching person details:", error);
		return null;
	}
};

export const getFilteredData = async (query : string): Promise<PeopleResponse | null> => {
	try {
		const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
		const results = await response.json();
		return results;
	} catch (error) {
		console.error("Error fetching filtered person:", error);
		return null;
	}
};