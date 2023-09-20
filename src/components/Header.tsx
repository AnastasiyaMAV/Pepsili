import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Link } from "react-router-dom";

import { useRouteMatch } from "../hooks/useRouteMatch";

export const Header = () => {
	const routeMatch = useRouteMatch(["/table", "/cards", "/search"]);
	const currentTab = routeMatch?.pattern?.path;

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
			<Tabs value={currentTab}>
				<Tab label="Table of dog breeds" value="/table" to="/table" component={Link} />
				<Tab label="Dog cards" value="/cards" to="/cards" component={Link} />
				<Tab label="Dog breed photo search" value="/search" to="/search" component={Link} />
			</Tabs>
		</Box>
	);
};
