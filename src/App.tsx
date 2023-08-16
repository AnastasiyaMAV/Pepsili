import Box from "@mui/material/Box";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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
					<Route index element={<div>Table of dog breeds</div>} />
					<Route path="table" element={<div>Table of dog breeds</div>} />
					<Route path="cards" element={<div>Dog cards</div>} />
					<Route path="search" element={<div>Dog breed photo search</div>} />
					<Route path="*" element={<div>4</div>} />
				</Routes>
			</Box>
		</Router>
	);
}

export default App;
