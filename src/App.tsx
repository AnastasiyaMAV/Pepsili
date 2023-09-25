import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Cards } from "./pages/Cards";
import { Error } from "./pages/Error";
import { PhotoAlbum } from "./pages/PhotoAlbum";
import { Search } from "./pages/Search";
import { TableDog } from "./pages/TableDog";

import { Header } from "./components/Header";

import "./App.css";

export const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route index element={<TableDog />} />
				<Route path="table" element={<TableDog />} />
				<Route path="cards" element={<Cards />} />
				<Route path="search" element={<Search />} />
				<Route path="photoAlbum" element={<PhotoAlbum />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</Router>
	);
};
