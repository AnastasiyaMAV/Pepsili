import { Box, Grid, createTheme, styled } from "@mui/material";

export const СontainerMenu = styled(Box)(({ theme }) => ({
	[theme.breakpoints.between("xs", "md")]: {
		display: "none",
	},
	[theme.breakpoints.between("md", "xl")]: {
		display: "block",
	},
}));

export const СontainerMenuButton = styled(Box)(({ theme }) => ({
	[theme.breakpoints.between("md", "xl")]: {
		display: "none",
	},
	[theme.breakpoints.between("xs", "md")]: {
		display: "block",
	},
}));

export const СontainerPhotoAlbumForm = styled(Box)(({ theme }) => ({
	[theme.breakpoints.between("xs", "md")]: {
		flexDirection: "column",
	},
	[theme.breakpoints.between("md", "xl")]: {
		flexDirection: "row",
	},
}));

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1600,
		},
	},
});

export const СontainerRandomImgDog = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.between("xs", "lg")]: {
		display: "none",
	},
}));
