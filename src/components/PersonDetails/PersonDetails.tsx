import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getPersonDetailsStart } from "../../store/personSlice";
import { PersonDetailsResponse } from "../../types";
import { Box, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

const PersonDetails: React.FC = (): ReactJSXElement => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();

	const { loading, personDetails, error } = useAppSelector(
		(state) => state.person
	);

	useEffect(() => {
		if (id != null) {
			dispatch(getPersonDetailsStart(id));
		}
	}, [id, dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const renderDetails = (person: PersonDetailsResponse): ReactJSXElement => {
		return (
			<Box>
				<Box mb={2}>
					<Typography
						component={Link}
						to="/"
						variant="h6"
						color="textPrimary"
						style={{ textDecoration: "none" }}
					>
						<ArrowBack /> Back to list
					</Typography>
				</Box>
				<Typography variant="h4" gutterBottom>
					{person.name}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
                    Gender: {person.gender}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
                    Birth year: {person.birth_year}
				</Typography>
				<Typography color="textSecondary" gutterBottom>
                    Height: {person.height} cm
				</Typography>
			</Box>
		);
	};

	return <div>{personDetails && renderDetails(personDetails)}</div>;
};

export default PersonDetails;