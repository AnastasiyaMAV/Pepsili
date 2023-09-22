import { Alert, AlertColor, Snackbar, Stack } from "@mui/material";
import { SyntheticEvent, useState } from "react";

export const Toast = ({ message, type }: { message: string; type: AlertColor }) => {
	const [open, setOpen] = useState<boolean>(true);
	const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
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
