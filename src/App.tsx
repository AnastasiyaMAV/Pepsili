import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Cards } from "./pages/Cards";
import { Search } from "./pages/Search";
import { TableDog } from "./pages/TableDog";

import { Header } from "./components/Header";

import "./App.css";
import { dogsState } from "./store/dogs";

export const App = () => {
	useEffect(() => {
		dogsState.fetchDogBreeds();
	}, []);

	return (
		<Router>
			<Header />
			<Routes>
				<Route index element={<TableDog />} />
				<Route path="table" element={<TableDog />} />
				<Route path="cards" element={<Cards />} />
				<Route path="search" element={<Search />} />
				<Route path="*" element={<div>4</div>} />
			</Routes>
		</Router>
	);
};
