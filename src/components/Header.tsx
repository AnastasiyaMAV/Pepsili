import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Link, matchPath, useLocation } from "react-router-dom";

function useRouteMatch(patterns: readonly string[]) {
	const { pathname } = useLocation();

	for (let i = 0; i < patterns.length; i += 1) {
		const pattern = patterns[i];
		const possibleMatch = matchPath(pattern, pathname);
		if (possibleMatch !== null) {
			return possibleMatch;
		}
	}

	return null;
}

export default function Header() {
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
}
