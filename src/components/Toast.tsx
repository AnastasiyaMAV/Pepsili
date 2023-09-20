import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import * as React from "react";

export const Toast = ({ message, type }: { message: string; type: AlertColor }) => {
	const [open, setOpen] = React.useState(true);
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<Stack spacing={2} sx={{ width: "100%" }}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
		</Stack>
	);
};
