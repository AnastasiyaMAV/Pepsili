import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Cards from "./pages/Cards";
import Search from "./pages/Search";
import Table from "./pages/Table";

import Header from "./components/Header";

import "./App.css";
import { dogsState } from "./store/dogs";

function App() {
	dogsState.fetchDogBreeds();

	return (
		<Router>
			<Header />
			<Routes>
				<Route index element={<Table />} />
				<Route path="table" element={<Table />} />
				<Route path="cards" element={<Cards />} />
				<Route path="search" element={<Search />} />
				<Route path="*" element={<div>4</div>} />
			</Routes>
		</Router>
	);
}

export default App;
