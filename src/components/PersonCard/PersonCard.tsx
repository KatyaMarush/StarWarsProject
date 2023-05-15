import React, { useState } from "react";
import { Person } from "../../types";
import { Link } from "react-router-dom";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

interface Props {
  person: Person;
  onEdit: (updatedPerson: Person) => void;
}

const PersonCard: React.FC<Props> = ({ person, onEdit }): ReactJSXElement => {

	const id: string = person.url.match(/(\d+)/)?.[0] ?? "";

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedPerson, setEditedPerson] = useState<Person>({ ...person });

	const toggleEditMode = (): void => {
		setIsEditing(!isEditing);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setEditedPerson({
			...editedPerson,
			[event.target.name]: event.target.value,
		});
	};

	const handleSave = (): void => {
		onEdit(editedPerson);
		setIsEditing(false);
	};

	return (
		<div>
			{isEditing ? (
				<div>
					<label>
            Name:
						<input
							type="text"
							name="name"
							value={editedPerson.name}
							onChange={handleInputChange}
						/>
					</label>
					<label>
            Height:
						<input
							type="text"
							name="height"
							value={editedPerson.height}
							onChange={handleInputChange}
						/>
					</label>
					<button onClick={handleSave}>Save</button>
					<button onClick={toggleEditMode}>Cancel</button>
				</div>
			) : (
				<div>
					<h3 data-testid="person-name">{person.name}</h3>
					<p>Height: {person.height}</p>
					<button onClick={toggleEditMode}>Edit</button>
					<Link to={`/person/${id}`} style={{ textDecoration: "none" }}>
						<button>View Details</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default PersonCard;
