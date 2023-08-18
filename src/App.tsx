import Box from "@mui/material/Box";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Cards from "./pages/Cards";
import Table from "./pages/Table";

import Header from "./components/Header";

import "./App.css";
import { dogsState } from "./store/dogs";

function App() {
	dogsState.fetchDogBreeds();

	return (
		<Router>
			<Box sx={{ width: "100%" }}>
				<Header />
				<Routes>
					<Route index element={<Table />} />
					<Route path="table" element={<Table />} />
					<Route path="cards" element={<Cards />} />
					<Route path="search" element={<div>Dog breed photo search</div>} />
					<Route path="*" element={<div>4</div>} />
				</Routes>
			</Box>
		</Router>
	);
}

export default App;
