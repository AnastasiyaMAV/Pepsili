import { action, map, onMount, task } from "nanostores";

import { DogsStore, TAllImgDogs } from "../types/general";

function createDogsStore() {
	const initialState = {
		isLoadingRandomDog: false,
		isLoadingDogBreeds: false,
		dogs: {},
		breed: [],
		subBreed: [[]],
		searchImgBreed: "",
		photoAlbum: { message: [], status: "" },
		randomImgDog: { message: "", status: "" },
		error: false,
	};

	const store = map<DogsStore>(initialState);

	const fetchDogBreeds = action(store, "fetchDogBreeds", store => {
		store.setKey("isLoadingDogBreeds", true);
		setTimeout(
			() =>
				task(async () => {
					try {
						const data = await fetch("https://dog.ceo/api/breeds/list/all").then(res => {
							if (res.ok) return res.json();
						});
						store.setKey("error", false);
						store.setKey("dogs", data.message);
						store.setKey("breed", Object.keys(data.message));
						store.setKey("subBreed", Object.values(data.message));
					} catch (e) {
						console.log(e);
						store.setKey("error", true);
					} finally {
						store.setKey("isLoadingDogBreeds", false);
					}
				}).catch(console.log),
			1000
		);
	});

	const searchDogBreeds = action(store, "searchDogBreeds", (store, props: string) => {
		store.setKey("isLoadingDogBreeds", true);
		props &&
			task(async () => {
				try {
					const data = await fetch(`https://dog.ceo/api/breed/${props}/images`).then(res => {
						if (res.ok) return res.json();
					});
					store.setKey("error", false);
					store.setKey("photoAlbum", data);
					const randomNum = Math.floor(Math.random() * data.message.length);
					store.setKey("searchImgBreed", data.message[randomNum]);
				} catch (e) {
					console.log(e);
					store.setKey("error", true);
				} finally {
					store.setKey("isLoadingDogBreeds", false);
				}
			}).catch(console.log);
	});

	const randomDog = action(store, "randomDog", store => {
		store.setKey("isLoadingRandomDog", true);
		setTimeout(
			() =>
				task(async () => {
					try {
						const data = await fetch("https://dog.ceo/api/breeds/image/random").then(res => {
							if (res.ok) return res.json();
						});
						store.setKey("error", false);
						store.setKey("randomImgDog", data);
					} catch (e) {
						console.log(e);
						store.setKey("error", true);
					} finally {
						store.setKey("isLoadingRandomDog", false);
					}
				}).catch(console.log),
			1000
		);
	});

	const setSearchImgBreed = action(store, "setSearchImgBreed", (store, value: string) => {
		store.setKey("searchImgBreed", value);
	});

	const setPhotoAlbum = action(store, "setPhotoAlbum", (store, value: TAllImgDogs) => {
		store.setKey("photoAlbum", value);
	});

	const setIsLoading = action(
		store,
		"setIsLoading",
		(store, value: boolean, loading: "isLoadingRandomDog" | "isLoadingDogBreeds") => {
			return store.setKey(loading, value);
		}
	);

	onMount(store, () => {
		fetchDogBreeds();
		randomDog();
	});

	return { store, fetchDogBreeds, searchDogBreeds, setPhotoAlbum, randomDog, setSearchImgBreed, setIsLoading };
}

export const dogsState = createDogsStore();
