import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import {
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
	Typography,
} from "@mui/material";
import { useStore } from "@nanostores/react";
import { ChangeEvent, useState } from "react";

import { RandomImgDog } from "../components/RandomImgDog";
import { SkeletonTable } from "../components/SkeletonTable";
import { Toast } from "../components/Toast";

import { dogsState } from "../store/dogs";
import { СontainerRandomImgDog } from "../styles/adaptiveLayout";

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

export const TableDog = () => {
	const { breed, subBreed, isLoadingDogBreeds, error } = useStore(dogsState.store);

	const rows = breed.map((br, idx) => ({
		byBreed: br,
		bySubBreed: subBreed[idx],
	}));

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(9);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<>
			<Grid container spacing={2} style={{ marginTop: "24px" }}>
				<Grid item xs={12} sm={12} md={12} lg={6} xl={6} container justifyContent="center">
					<Paper
						sx={{
							overflow: "hidden",
							marginX: "24px",
							width: "fit-content",
						}}
					>
						<Paper>
							<TableContainer>
								<Table aria-label="table">
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
										{!isLoadingDogBreeds ? (
											rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
												return (
													<TableRow hover tabIndex={-1} key={row.byBreed}>
														{columns.map(column => {
															const value = row[column.id];
															return (
																<TableCell key={column.id} align={column.align}>
																	{column.id === "bySubBreed" && value.length === 0 && (
																		<Tooltip title="No data" placement="right" arrow>
																			<BrowserNotSupportedIcon />
																		</Tooltip>
																	)}
																	{typeof value === "object" && value.length > 1
																		? value.map(element => {
																				return (
																					<Typography variant="body2" key={element}>
																						{element}
																					</Typography>
																				);
																		  })
																		: value}
																</TableCell>
															);
														})}
													</TableRow>
												);
											})
										) : (
											<SkeletonTable rowsNum={11} />
										)}
										{error && <SkeletonTable rowsNum={11} />}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[9, 25, 100]}
								component="div"
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Paper>
					</Paper>
				</Grid>
				<СontainerRandomImgDog item lg={6} xl={6} container direction="row" justifyContent="center" alignItems="center">
					<RandomImgDog />
				</СontainerRandomImgDog>
			</Grid>

			{error && (
				<Toast
					message="Something went wrong, the data was not loaded into the table, please try again later"
					type={"error"}
				/>
			)}
		</>
	);
};
