import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { useStore } from "@nanostores/react";
import { useState } from "react";

import { SkeletonCards } from "../components/SkeletonCards";
import { Toast } from "../components/Toast";

import { useClipboard } from "../hooks/useClipboard";

import { dogsState } from "../store/dogs";
import { Item } from "../styles/general";

export const Cards = () => {
	const { breed, isLoadingDogBreeds, error } = useStore(dogsState.store);
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
				{!isLoadingDogBreeds ? (
					cards.map((element, index) => (
						<Grid item xs={2} sm={4} md={4} key={index}>
							<Item>
								{element.byBreed}
								<Tooltip title={isCopied ? "Copied!" : "Copy"} placement="right" arrow>
									<IconButton
										color="primary"
										aria-label="content copy"
										onClick={() => copyToClipboard(element.byBreed)}
									>
										<ContentCopyIcon />
									</IconButton>
								</Tooltip>
							</Item>
						</Grid>
					))
				) : (
					<SkeletonCards rowsNum={54} />
				)}
				{error && <SkeletonCards rowsNum={54} />}
			</Grid>
			{error && <Toast message="Something went wrong, please try again later" type={"error"} />}
		</Box>
	);
};
