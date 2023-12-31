import { dogsState } from "@/store/dogs";
import { СontainerPhotoAlbumForm } from "@/styles/adaptiveLayout";
import { ImgPhoto } from "@/styles/general";
import { TDog } from "@/types/general";
import { searchScheme } from "@/validation/search";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, FormControl, IconButton, InputLabel, MenuItem, Select, Skeleton, Tooltip } from "@mui/material";
import ImageListItem, { imageListItemClasses } from "@mui/material/ImageListItem";
import { useStore } from "@nanostores/react";
import { SyntheticEvent, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

export const PhotoAlbum = () => {
	const { breed, photoAlbum, isLoadingDogBreeds } = useStore(dogsState.store);

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

	const handlerOnError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.target as HTMLImageElement;
		target.src = "/src/assets/dog.png";
		target.srcset = "/src/assets/dog.png";
	};

	useEffect(() => {
		return () => {
			dogsState.setPhotoAlbum({ message: [], status: "" });
			dogsState.setIsLoading(false, "isLoadingDogBreeds");
		};
	}, []);

	return (
		<>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(handleSendFoto)}>
					<Box sx={{ marginTop: "24px", display: "flex", gap: 24 }}>
						<FormControl>
							<СontainerPhotoAlbumForm sx={{ display: "flex", flexDirection: "row", gap: "24px" }}>
								<InputLabel id="label-breed">Breed</InputLabel>
								{breed.length === 0 ? (
									<Tooltip title="Something went wrong, please try again later" placement="top-start">
										<Select
											labelId="label-breed"
											id="select-breed"
											sx={{ width: "230px" }}
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
												sx={{ width: "230px" }}
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
									Show photos
								</LoadingButton>
								{errors.breed && <Alert severity="error">{errors.breed.message}</Alert>}
							</СontainerPhotoAlbumForm>
						</FormControl>
					</Box>
				</form>
			</FormProvider>
			<Box
				sx={{
					marginTop: "24px",
					display: "grid",
					gridTemplateColumns: {
						xs: "repeat(1, 1fr)",
						sm: "repeat(2, 1fr)",
						md: "repeat(3, 1fr)",
						lg: "repeat(4, 1fr)",
						xl: "repeat(4, 1fr)",
					},
					justifyItems: "center",
					rowGap: "4px",
					[`& .${imageListItemClasses.root}`]: {
						display: "flex",
						flexDirection: "column",
					},
				}}
			>
				{photoAlbum.message.length > 0
					? photoAlbum.message.map(item => (
							<ImageListItem key={item}>
								<ImgPhoto src={`${item}`} srcSet={`${item}`} loading="eager" onError={e => handlerOnError(e)} />
							</ImageListItem>
					  ))
					: [...Array(8)].map((_, index) => (
							<Skeleton key={index} variant="rectangular" width="350px" animation="wave">
								<div style={{ height: "350px" }} />
							</Skeleton>
					  ))}
			</Box>
			{photoAlbum.message.length > 0 && (
				<Box sx={{ textAlign: "end" }} title="UP">
					<IconButton onClick={() => window.scrollTo({ top: 0 })}>
						<ExpandLessIcon />
					</IconButton>
				</Box>
			)}
		</>
	);
};
