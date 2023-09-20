import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { experimentalStyled as styled } from "@mui/material/styles";
import { useStore } from "@nanostores/react";
import { useState } from "react";

import { useClipboard } from "../hooks/useClipboard";

import { dogsState } from "../store/dogs";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export const Cards = () => {
	const { breed } = useStore(dogsState.store);
	const cards = breed.map(br => ({
		byBreed: br,
	}));

	const [isCopied, setIsCopied] = useState(false);

	const copyText = useClipboard();
	const copyToClipboard = (value: string) => {
		value && copyText(value);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 500);
	};

	return (
		<Box sx={{ flexGrow: 1, marginTop: "24px" }}>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 24 }}>
				{cards.map((element, index) => (
					<Grid item xs={2} sm={4} md={4} key={index}>
						<Item>
							{element.byBreed}
							<Tooltip title={isCopied ? "Copied!" : "Copy"} placement="right" arrow>
								<IconButton color="primary" aria-label="content copy" onClick={() => copyToClipboard(element.byBreed)}>
									<ContentCopyIcon />
								</IconButton>
							</Tooltip>
						</Item>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
