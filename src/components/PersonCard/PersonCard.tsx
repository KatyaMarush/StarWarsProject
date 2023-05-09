import React, { useState } from "react";
import { Person } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  person: Person;
  onEdit: (updatedPerson: Person) => void;
}

const PersonCard: React.FC<Props> = ({ person, onEdit }) => {

	const id = person.url.match(/(\d+)/)?.[0];

	const [isEditing, setIsEditing] = useState(false);
	const [editedPerson, setEditedPerson] = useState<Person>({ ...person });

	const toggleEditMode = () => {
		setIsEditing(!isEditing);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEditedPerson({
			...editedPerson,
			[event.target.name]: event.target.value,
		});
	};

	const handleSave = () => {
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
