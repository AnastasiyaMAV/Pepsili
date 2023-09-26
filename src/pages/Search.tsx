import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
	Alert,
	Box,
	Card,
	CardContent,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Skeleton,
	Tooltip,
	Zoom,
} from "@mui/material";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { Toast } from "../components/Toast";

import Dog from "../assets/dog.png";
import { dogsState } from "../store/dogs";
import { Img } from "../styles/general";
import { TDog } from "../types/general";
import { searchScheme } from "../validation/search";

export const Search = () => {
	const { breed, searchImgBreed, error, isLoadingDogBreeds } = useStore(dogsState.store);

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
			dogsState.setSearchImgBreed("");
			dogsState.setIsLoading(false, "isLoadingDogBreeds");
		};
	}, []);

	return (
		<Grid container spacing={2} style={{ marginTop: "24px" }}>
			<Grid item xs={12} sm={12} md={12} lg={6} xl={6} container justifyContent="center" alignItems="center">
				<Card
					sx={{
						minWidth: 275,
						width: "fit-content",
					}}
				>
					<CardContent sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}>
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
										{breed.length === 0 ? (
											<Tooltip title="Something went wrong, please try again later" placement="top-start">
												<Select
													labelId="label-breed"
													id="select-breed"
													sx={{ marginBottom: "24px", width: "230px" }}
													disabled={breed.length === 0}
												/>
											</Tooltip>
										) : (
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
										)}

										<LoadingButton
											type="submit"
											size="large"
											onClick={() => dogsState.setIsLoading(false, "isLoadingDogBreeds")}
											loading={isLoadingDogBreeds}
											variant="contained"
										>
											Get a photo
										</LoadingButton>
									</FormControl>
								</Box>
							</form>
						</FormProvider>
					</CardContent>
				</Card>
			</Grid>
			<Grid
				item
				xs={12}
				sm={12}
				md={12}
				lg={6}
				xl={6}
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				{searchImgBreed ? (
					<Zoom in={!!searchImgBreed} style={{ transitionDelay: !searchImgBreed ? "500ms" : "0ms" }}>
						{!error ? <Img src={searchImgBreed} /> : <Img src={Dog} />}
					</Zoom>
				) : (
					<Skeleton variant="rectangular" width="400px" animation="wave">
						<div style={{ height: "500px" }} />
					</Skeleton>
				)}
			</Grid>
			{error && <Toast message="Something went wrong, please try again later" type={"error"} />}
		</Grid>
	);
};
