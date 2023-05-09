import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PersonCard from "./PersonCard";
import { Person } from "../../types";

const mockPerson: Person = {
	name: "Luke Skywalker",
	height: "172",
	mass: "77",
	hair_color: "blond",
	skin_color: "fair",
	eye_color: "blue",
	birth_year: "19BBY",
	gender: "male",
	homeworld: "https://swapi.dev/api/planets/1/",
	films: [],
	species: [],
	vehicles: [],
	starships: [],
	created: "2014-12-09T13:50:51.644000Z",
	edited: "2014-12-20T21:17:56.891000Z",
	url: "https://swapi.dev/api/people/1/",
};

describe("PersonCard", () => {
	it("should render person details and edit button", () => {
		const onEdit = jest.fn();
		render(
			<MemoryRouter>
				<Routes>
					<Route path="/" element={<PersonCard person={mockPerson} onEdit={() => {onEdit;}} />}/>
				</Routes>
			</MemoryRouter>);


		expect(screen.getByTestId("person-name")).toHaveTextContent(/Luke Skywalker/i);
		expect(screen.getByText("Height: 172")).toBeInTheDocument();
		expect(screen.getByText("Edit")).toBeInTheDocument();
	});

	it("should enter edit mode when edit button is clicked", () => {
		const onEdit = jest.fn();
		render(
			<MemoryRouter>
				<Routes>
					<Route path="/" element={<PersonCard person={mockPerson} onEdit={() => {onEdit;}} />}/>
				</Routes>
			</MemoryRouter>);

		fireEvent.click(screen.getByText("Edit"));

		expect(screen.getByText("Name:")).toBeInTheDocument();
		expect(screen.getByText("Height:")).toBeInTheDocument();
		expect(screen.getByText("Save")).toBeInTheDocument();
		expect(screen.getByText("Cancel")).toBeInTheDocument();
	});
});
