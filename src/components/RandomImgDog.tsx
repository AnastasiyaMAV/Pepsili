import { dogsState } from "@/store/dogs";
import { Img } from "@/styles/general";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, Skeleton, Zoom } from "@mui/material";
import { useStore } from "@nanostores/react";
import { SyntheticEvent, useState } from "react";

import { Toast } from "@/components/Toast";

export const RandomImgDog = () => {
	const { randomImgDog, isLoadingRandomDog } = useStore(dogsState.store);
	const [errorUrlImg, setErrorUrlImg] = useState<boolean>(false);

	const handlerRandomImgDog = () => {
		setErrorUrlImg(false);
		dogsState.randomDog();
	};

	const handlerOnError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		setErrorUrlImg(true);
		const target = e.target as HTMLImageElement;
		target.src = "/src/assets/dog.png";
		target.srcset = "/src/assets/dog.png";
	};

	return (
		<>
			<Grid item xs={6} container direction="row" justifyContent="center" alignItems="center">
				<Box sx={{ top: "100px", position: "fixed", display: "flex", flexDirection: "column" }}>
					{randomImgDog.message ? (
						<>
							<Zoom in={!!randomImgDog} style={{ transitionDelay: !randomImgDog ? "500ms" : "0ms" }}>
								<Img src={randomImgDog.message} onError={e => handlerOnError(e)} />
							</Zoom>
						</>
					) : (
						<Skeleton variant="rectangular" width="400px" animation="wave">
							<div style={{ height: "500px" }} />
						</Skeleton>
					)}
					<LoadingButton
						sx={{ marginTop: "24px" }}
						size="large"
						onClick={handlerRandomImgDog}
						loading={isLoadingRandomDog}
						variant="contained"
					>
						Random photo of a dog
					</LoadingButton>
				</Box>
			</Grid>
			{errorUrlImg && (
				<Toast message="Something went wrong, the random photo did not load, please try again later" type={"error"} />
			)}
		</>
	);
};
