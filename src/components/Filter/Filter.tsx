import React from "react";
import { Box, TextField } from "@mui/material";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const Filter: React.FC<Props> = ({ value, onChange }) => {
	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<Box mb={2}>
			<TextField
				label="Filter"
				value={value}
				onChange={handleFilterChange}
				fullWidth
			/>
		</Box>
	);
};

export default Filter;