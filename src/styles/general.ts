import Paper from "@mui/material/Paper";
import { experimentalStyled as styledMui } from "@mui/material/styles";
import styled from "styled-components";

export const Item = styledMui(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export const Img = styled.img`
	width: 400px;
	height: 500px;
	object-fit: scale-down;
`;
