import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, Skeleton, Zoom } from "@mui/material";
import { useStore } from "@nanostores/react";
import { useState } from "react";

import { Toast } from "../components/Toast";

import Dog from "../assets/dog.png";
import { dogsState } from "../store/dogs";
import { Img } from "../styles/general";

export const RandomImgDog = () => {
	const { error, randomImgDog, isLoadingRandomDog } = useStore(dogsState.store);
	const [errorUrlImg, setErrorUrlImg] = useState<boolean>(false);

	const handlerRandomImgDog = () => {
		setErrorUrlImg(false);
		dogsState.randomDog();
	};

	return (
		<>
			<Grid item xs={6} container direction="row" justifyContent="center" alignItems="center">
				{randomImgDog.message ? (
					<>
						<Zoom in={!!randomImgDog} style={{ transitionDelay: !randomImgDog ? "500ms" : "0ms" }}>
							{!error && !errorUrlImg ? (
								<Img src={randomImgDog.message} onError={() => setErrorUrlImg(true)} />
							) : (
								<Img src={Dog} />
							)}
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
			</Grid>
			{errorUrlImg && (
				<Toast message="Something went wrong, the random photo did not load, please try again later" type={"error"} />
			)}
		</>
	);
};
