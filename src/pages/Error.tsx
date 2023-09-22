import { Box, Card, CardContent, Link, Typography } from "@mui/material";

import Dog from "../assets/dog.png";
import { Img } from "../styles/general";

export const Error = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				placeItems: "center",
				marginTop: "24px",
			}}
		>
			<Card
				sx={{
					minWidth: 275,
					width: "fit-content",
				}}
			>
				<CardContent sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}>
					<Typography variant="h2" gutterBottom>
						Something went wrong
					</Typography>
					<Img src={Dog} />
					<Link href="/" underline="hover">
						Go to Main page
					</Link>
				</CardContent>
			</Card>
		</Box>
	);
};
