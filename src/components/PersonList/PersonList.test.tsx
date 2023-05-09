import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import PersonList from "./PersonList";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { MockStoreEnhanced } from "redux-mock-store";

const mockStore = configureStore([thunk]);

describe("PersonList", () => {
	let store: MockStoreEnhanced<unknown, object>;

	beforeEach(() => {
		store = mockStore({
			person: {
				loading: false,
				data: [
					{ name: "Alice", url: "http://example.com/alice" },
					{ name: "Bob", url: "http://example.com/bob" },
					{ name: "Charlie", url: "http://example.com/charlie" },
				],
				error: null,
				count: 30,
			},
		});
	});

	it("should render the Filter component", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Routes>
						<Route path="/" element={<PersonList/>}/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
		const filterInput = screen.getByLabelText("Filter");
		expect(filterInput).toBeInTheDocument();
	});

	it("should render the filtered PersonCard components", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Routes>
						<Route path="/" element={<PersonList/>}/>
					</Routes>
				</MemoryRouter>
			</Provider>
		);
		const filterInput = screen.getByLabelText("Filter");
		fireEvent.change(filterInput, { target: { value: "a" } });
		const personCards = screen.getAllByTestId("person-name");
		expect(personCards).toHaveLength(2);
	});
});
