import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import PersonList from "../src/components/PersonList/PersonList";
import { AnyAction } from "redux";

const mockStore = configureMockStore<object, ThunkDispatch<object, object, AnyAction>>([thunk]);

describe("PersonList", () => {
	let store: MockStoreEnhanced<object, ThunkDispatch<object, object, AnyAction>>;

	beforeEach(() => {
		store = mockStore({
			person: {
				loading: false,
				data: [
					{ name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
					{ name: "Leia Organa", url: "https://swapi.dev/api/people/5/" },
				],
				error: null,
				count: 2,
			},
		});
	});

	it("should render a list of people", () => {
		render(
			<Provider store={store}>
				<Router>
					<PersonList />
				</Router>
			</Provider>
		);

		expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
		expect(screen.getByText("Leia Organa")).toBeInTheDocument();
	});

	it("should show loading indicator while fetching data", () => {
		store = mockStore({
			person: {
				loading: true,
				data: [],
				error: null,
				count: 0,
			},
		});

		render(
			<Provider store={store}>
				<Router>
					<PersonList />
				</Router>
			</Provider>
		);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("should show error message if there is an error", () => {
		store = mockStore({
			person: {
				loading: false,
				data: [],
				error: "Something went wrong",
				count: 0,
			},
		});

		render(
			<Provider store={store}>
				<Router>
					<PersonList />
				</Router>
			</Provider>
		);

		expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
	});

	it("should navigate to person details page when a person card is clicked", () => {
		render(
			<Provider store={store}>
				<Router>
					<PersonList />
				</Router>
			</Provider>
		);

		const personCard = screen.getByText("Luke Skywalker");

		personCard.click();

		expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
	});
});
