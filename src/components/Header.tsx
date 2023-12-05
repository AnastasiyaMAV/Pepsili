import { themeState } from "@/store/theme";
import { СontainerMenu, СontainerMenuButton } from "@/styles/adaptiveLayout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useStore } from "@nanostores/react";
import { Link } from "react-router-dom";

import { MenuButton } from "@/components/MenuButton";

import { useRouteMatch } from "@/hooks/useRouteMatch";

export const Header = () => {
	const routeMatch = useRouteMatch(["/table", "/cards", "/search", "/photoAlbum"]);
	const currentTab = routeMatch?.pattern?.path;
	const { darkTheme } = useStore(themeState.store);

	return (
		<>
			<Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "end" }}>
				<СontainerMenu
					sx={{
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<IconButton
						onClick={() => {
							themeState.setIsDarkTheme(!darkTheme);
						}}
						color="inherit"
					>
						{darkTheme ? <Brightness4Icon /> : <Brightness7Icon />}
					</IconButton>
					<Tabs value={currentTab}>
						<Tab label="Table of dog breeds" value="/table" to="/table" component={Link} />
						<Tab label="Dog cards" value="/cards" to="/cards" component={Link} />
						<Tab label="Dog breed photo search" value="/search" to="/search" component={Link} />
						<Tab label="Photo Album" value="/photoAlbum" to="/photoAlbum" component={Link} />
						<Tab value="/" to="/" component={Link} icon={<FavoriteIcon />} />
					</Tabs>
				</СontainerMenu>
				<СontainerMenuButton>
					<MenuButton />
				</СontainerMenuButton>
			</Box>
			<Box sx={{ display: "flex", alignItems: "flex-end" }}>
				<Typography variant="body2" gutterBottom sx={{ width: "fit-content", fontStyle: "italic" }}>
					&quot;You become responsible forever for what you&apos;ve tamed.&quot; ― Antoine de Saint-Exupéry, The Little
					Prince
				</Typography>
			</Box>
		</>
	);
};
