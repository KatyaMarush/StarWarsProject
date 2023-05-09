import React from "react";
import "./App.css";
import PersonList from "./components/PersonList/PersonList";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonDetails from "./components/PersonDetails/PersonDetails";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Routes>
						<Route path="/" element={<PersonList />} />
						<Route path="/person/:id" element={<PersonDetails />} />
					</Routes>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
