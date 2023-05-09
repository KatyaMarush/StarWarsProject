import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { AppDispatch, RootState } from "../../store";
import { Person } from "../../types";
import PersonDetails from "./PersonDetails";

const mockStore = configureMockStore<RootState, AppDispatch>([thunk]);

describe("PersonDetails", () => {
	let store: MockStoreEnhanced<
        {
            person: {
                loading: boolean;
                personDetails: Person | null;
                error: string | null;
            };
        },
        AppDispatch
        >;

	beforeEach(() => {
		store = mockStore({
			person: {
				data: [],
				count: 1,
				loading: false,
				personDetails: {
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
				},
				error: "",
			},
		});
	});

	it("renders person details when loaded", () => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/person/:id"]}>
					<PersonDetails />
				</MemoryRouter>
			</Provider>
		);

		setTimeout(() => {
			expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
			expect(screen.getByText("Gender: male")).toBeInTheDocument();
			expect(screen.getByText("Birth year: 19BBY")).toBeInTheDocument();
			expect(screen.getByText("Height: 172 cm")).toBeInTheDocument();
		}, 0);
	});

	it("renders error message when there is an error", () => {
		store = mockStore({
			person: {
				count: 0,
				data: [],
				loading: false,
				personDetails: null,
				error: "Failed to load person details",
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/person/:id"]}>
					<PersonDetails />
				</MemoryRouter>
			</Provider>
		);

		setTimeout(() => {
			expect(screen.getByText("Error: Failed to load person details")).toBeInTheDocument();
		}, 0);
	});
});
