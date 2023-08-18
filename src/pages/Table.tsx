import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { useStore } from "@nanostores/react";
import * as React from "react";

import { dogsState } from "../store/dogs";

interface Column {
	id: "byBreed" | "bySubBreed";
	label: string;
	minWidth?: number;
	align?: "right";
}

const columns: readonly Column[] = [
	{ id: "byBreed", label: "By breed", minWidth: 200 },
	{ id: "bySubBreed", label: "By sub-breed", minWidth: 250 },
];

export default function StickyHeadTable() {
	const { breed, subBreed } = useStore(dogsState.store);

	const rows = breed.map((br, idx) => ({
		byBreed: br,
		bySubBreed: subBreed[idx],
	}));

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper
			sx={{
				overflow: "hidden",
				marginX: "24px",
				marginTop: "24px",
			}}
		>
			<Paper>
				<TableContainer>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map(column => (
									<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.byBreed}>
										{columns.map(column => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.id === "bySubBreed" && value.length === 0 ? (
														<Tooltip title="No data" placement="right" arrow>
															<BrowserNotSupportedIcon />
														</Tooltip>
													) : (
														value + " "
													)}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Paper>
	);
}
