import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useRouteMatch } from "../hooks/useRouteMatch";

export const Header = () => {
	const routeMatch = useRouteMatch(["/table", "/cards", "/search"]);
	const currentTab = routeMatch?.pattern?.path;

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between" }}>
			<Box sx={{ display: "flex", alignItems: "flex-end" }}>
				<Typography variant="body2" gutterBottom sx={{ width: "fit-content", fontStyle: "italic" }}>
					&quot;You become responsible forever for what you&apos;ve tamed.&quot; ― Antoine de Saint-Exupéry, The Little
					Prince
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
				}}
			>
				<Tabs value={currentTab}>
					<Tab label="Table of dog breeds" value="/table" to="/table" component={Link} />
					<Tab label="Dog cards" value="/cards" to="/cards" component={Link} />
					<Tab label="Dog breed photo search" value="/search" to="/search" component={Link} />
					<Tab value="/" to="/" component={Link} icon={<FavoriteIcon />} />
				</Tabs>
			</Box>
		</Box>
	);
};
