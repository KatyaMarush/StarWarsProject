import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Filter from "./Filter";

describe("Filter", () => {
	it("should call onChange handler with correct value", () => {
		const onChange = jest.fn();
		render(<Filter value="" onChange={onChange} />);

		const input = screen.getByLabelText("Filter");

		fireEvent.change(input, { target: { value: "test" } });

		expect(onChange).toHaveBeenCalledWith("test");
	});

	it("should display the provided value", () => {
		const onChange = jest.fn();
		render(<Filter value="test" onChange={() => {onChange;}} />);

		const input = screen.getByLabelText("Filter");

		expect(input).toHaveValue("test");
	});
});
