import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPeople, getPersonDetails, getFilteredData } from "../api/swapi";
import { RootState } from "./index";
import { PersonState } from "../types";

const initialState: PersonState = {
	data: [],
	personDetails: null,
	loading: false,
	error: "",
	count: 0,
};

export const getPeopleStart = createAsyncThunk(
	"person/getPeople",
	async (page: number) => {
		const response = await getPeople(page);
		return response;
	}
);

export const getPersonDetailsStart = createAsyncThunk(
	"person/getPersonDetails",
	async (id: string) => {
		const response = await getPersonDetails(id);
		return response;
	}
);

export const getFilteredPersonStart = createAsyncThunk(
	"person/getFilteredPerson",
	async (value: string) => {
		const response = await getFilteredData(value);
		return response;
	}
);

export const editPerson = createSlice({
	name: "person",
	initialState,
	reducers: {
		editPersonLocally: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPeopleStart.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPeopleStart.fulfilled, (state, action) => {
				if (action.payload) {
					state.data = action.payload.results;
					state.count = action.payload.count;
				}
				state.loading = false;
			})
			.addCase(getPeopleStart.rejected, (state, action) => {
				state.error = action.error.message || "Error fetching data";
				state.loading = false;
			})
			.addCase(getPersonDetailsStart.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPersonDetailsStart.fulfilled, (state, action) => {
				if (action.payload) {
					state.personDetails = action.payload;
				}
				state.loading = false;
			})
			.addCase(getPersonDetailsStart.rejected, (state, action) => {
				state.error =
                    action.error.message || "Error fetching person details";
				state.loading = false;
			})
			.addCase(getFilteredPersonStart.pending, (state) => {
				state.loading = true;
			})
			.addCase(getFilteredPersonStart.fulfilled, (state, action) => {
				if (action.payload) {
					state.data = action.payload.results;
					state.count = action.payload.count;
				}
				state.loading = false;
			})
			.addCase(getFilteredPersonStart.rejected, (state, action) => {
				state.error = action.error.message || "Error fetching data";
				state.loading = false;
			});
	},
});

export default editPerson.reducer;

export const selectPerson = (state: RootState) => state.person;
export const { editPersonLocally } = editPerson.actions;