import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import PersonCard from "../PersonCard/PersonCard";
import { Person } from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks";
import { getPeopleStart, getFilteredPersonStart, editPersonLocally } from "../../store/personSlice";
import Filter from "../Filter/Filter";
import { debounce } from "lodash";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

const PersonList: React.FC = (): ReactJSXElement => {
	const [page, setPage] = useState<number>(1);
	const [filter, setFilter] = useState<string>("");

	const dispatch = useAppDispatch();

	const { loading, data, error, count } = useAppSelector(
		(state) => state.person
	);

	useEffect(()    => {
		dispatch(getPeopleStart(page));
	}, [dispatch, page]);


	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number): void => {
		setPage(value);
	};

	const handleFilterChange = useCallback(
		debounce((value: string) => {
			dispatch(getFilteredPersonStart(value));
		}, 500),
		[dispatch]
	);

	const handleFilterInputChange = (value: string): void => {
		setFilter(value);
		if (value.length) handleFilterChange(value);
	};

	const editPersonCard = (updatedPerson: Person): void => {
		const newData = data.map((person: Person) =>
			person.url === updatedPerson.url ? updatedPerson : person
		);
		dispatch(editPersonLocally(newData));
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<Filter value={filter} onChange={handleFilterInputChange} />
			<Grid container spacing={2}>
				{data.map((person: Person) => (
					<Grid item xs={12} sm={6} md={4} key={person.name}>
						<PersonCard person={person} onEdit={editPersonCard}  />
					</Grid>
				))}
			</Grid>
			<Pagination
				count={Math.ceil(count / 10)}
				page={page}
				onChange={handleChangePage}
				color="primary"
				style={{ marginTop: "16px" }}
			/>
		</div>
	);
};

export default PersonList;