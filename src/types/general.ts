export type TDog = {
	breed: string;
};

export type TDogs = {
	[key: string]: string[];
};

export type TOneImgDogs = {
	message: string;
	status: string;
};

export type TAllImgDogs = {
	message: string[];
	status: string;
};

export type TDogsStore = {
	isLoadingRandomDog: boolean;
	isLoadingDogBreeds: boolean;
	dogs: TDogs;
	breed: string[];
	subBreed: Array<string>[];
	searchImgBreed: string;
	photoAlbum: TAllImgDogs;
	randomImgDog: TOneImgDogs;
	error: boolean;
};

export type TThemeStore = {
	darkTheme: boolean;
};
