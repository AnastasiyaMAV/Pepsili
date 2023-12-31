import { Item } from "@/styles/general";
import { Grid, Skeleton } from "@mui/material";

export const SkeletonCards = ({ rowsNum }: { rowsNum: number }) => {
	return [...Array(rowsNum)].map((_, index) => (
		<Grid item xs={2} sm={4} md={4} key={index}>
			<Item>
				<Skeleton animation="wave" variant="rectangular" />
			</Item>
		</Grid>
	));
};
