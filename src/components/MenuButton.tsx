import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { IconButton, Menu, MenuItem, Tab } from "@mui/material";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";

export const MenuButton = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<DensityMediumIcon />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem onClick={handleClose}>
					<Tab label="Table of dog breeds" value="/table" to="/table" component={Link} />
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Tab label="Dog cards" value="/cards" to="/cards" component={Link} />
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Tab label="Dog breed photo search" value="/search" to="/search" component={Link} />
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Tab label="Photo Album" value="/photoAlbum" to="/photoAlbum" component={Link} />
				</MenuItem>
			</Menu>
		</div>
	);
};
