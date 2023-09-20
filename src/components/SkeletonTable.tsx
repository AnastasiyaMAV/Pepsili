import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const SkeletonTable = ({ rowsNum }: { rowsNum: number }) => {
	return [...Array(rowsNum)].map((row, index) => (
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
