import { Skeleton, TableCell, TableRow } from "@mui/material";

export const SkeletonTable = ({ rowsNum }: { rowsNum: number }) => {
	return [...Array(rowsNum)].map((_, index) => (
		<TableRow key={index}>
			<TableCell component="th" scope="row">
				<Skeleton animation="wave" variant="text" />
			</TableCell>
			<TableCell>
				<Skeleton animation="wave" variant="text" />
			</TableCell>
		</TableRow>
	));
};
