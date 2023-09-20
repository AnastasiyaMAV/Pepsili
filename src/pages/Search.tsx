import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import { dogsState } from "../store/dogs";
import { searchScheme } from "../validation/search";

type TDog = {
	breed: string;
};

export const Img = styled.img`
	width: 400px;
	height: 500px;
	object-fit: scale-down;
`;

export const Search = () => {
	const { breed, searchImgBreed, isLoading } = useStore(dogsState.store);

	const methods = useForm({
		defaultValues: { breed: "" },
		resolver: yupResolver(searchScheme),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = methods;

	const handleSendFoto = (data: TDog) => {
		dogsState.searchDogBreeds(data.breed);
	};

	useEffect(() => {
		return () => {
			dogsState.setSearchDogBreeds("");
			dogsState.setIsLoading(false);
		};
	}, []);

	return (
		<Grid container spacing={2} style={{ marginTop: "24px" }}>
			<Grid item xs={6} container justifyContent="center" alignItems="center">
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(handleSendFoto)}>
						<Box sx={{ minWidth: 120, maxWidth: 250, marginTop: "24px" }}>
							{errors.breed && (
								<Alert sx={{ marginBottom: "24px" }} severity="error">
									{errors.breed.message}
								</Alert>
							)}
							<FormControl fullWidth>
								<InputLabel id="label-breed">Breed</InputLabel>
								<Controller
									name="breed"
									control={control}
									defaultValue={""}
									render={({ field: { onChange, value } }) => (
										<Select
											labelId="label-breed"
											id="select-breed"
											value={value}
											onChange={onChange}
											sx={{ marginBottom: "24px", width: "230px" }}
										>
											{breed.map(element => {
												return (
													<MenuItem key={element} value={element}>
														{element}
													</MenuItem>
												);
											})}
										</Select>
									)}
								/>

								<Button type="submit" variant="contained">
									Get a photo
								</Button>
							</FormControl>
						</Box>
					</form>
				</FormProvider>
			</Grid>
			<Grid item xs={6} container direction="row" justifyContent="center" alignItems="center">
				{!isLoading ? (
					<Skeleton variant="rectangular" width="400px" animation="wave">
						<div style={{ height: "500px" }} />
					</Skeleton>
				) : (
					searchImgBreed && <Img src={searchImgBreed} />
				)}
			</Grid>
		</Grid>
	);
};
