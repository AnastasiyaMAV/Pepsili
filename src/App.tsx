import "@/App.css";
import { themeState } from "@/store/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useStore } from "@nanostores/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Cards } from "@/pages/Cards";
import { Error } from "@/pages/Error";
import { PhotoAlbum } from "@/pages/PhotoAlbum";
import { Search } from "@/pages/Search";
import { TableDog } from "@/pages/TableDog";

import { Header } from "@/components/Header";

export const App = () => {
	const { darkTheme } = useStore(themeState.store);
	const theme = createTheme({
		palette: {
			mode: darkTheme ? "dark" : "light",
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
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
		</ThemeProvider>
	);
};
