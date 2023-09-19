import { action, map, task } from "nanostores";

type TDogs = {
	[key: string]: string[];
};

type DogsStore = {
	isLoading: boolean;
	dogs: TDogs;
	breed: string[];
	subBreed: Array<string>[];
	searchImgBreed: string;
};

function createDogsStore() {
	const initialState = {
		isLoading: false,
		dogs: {},
		breed: [],
		subBreed: [[]],
		searchImgBreed: "",
	};

	const store = map<DogsStore>(initialState);

	const fetchDogBreeds = action(store, "fetchDogBreeds", store => {
		store.setKey("isLoading", true);

		task(async () => {
			try {
				const data = await fetch("https://dog.ceo/api/breeds/list/all").then(res => {
					if (res.ok) return res.json();
				});
				store.setKey("dogs", data.message);
				store.setKey("breed", Object.keys(data.message));
				store.setKey("subBreed", Object.values(data.message));
			} catch (e) {
				console.log(e);
			} finally {
				store.setKey("isLoading", false);
			}
		}).catch(console.log);
	});

	const searchDogBreeds = action(store, "searchDogBreeds", (store, props: string) => {
		props &&
			task(async () => {
				try {
					const data = await fetch(`https://dog.ceo/api/breed/${props}/images`).then(res => {
						if (res.ok) return res.json();
					});
					const randomNum = Math.floor(Math.random() * data.message.length);
					store.setKey("searchImgBreed", data.message[randomNum]);
				} catch (e) {
					console.log(e);
				} finally {
					store.setKey("isLoading", true);
				}
			}).catch(console.log);
	});

	const setSearchDogBreeds = action(store, "setSearchDogBreeds", (store, value: string) => {
		store.setKey("searchImgBreed", value);
	});

	const setIsLoading = action(store, "setIsLoading", (store, value: boolean) => {
		store.setKey("isLoading", value);
	});

	return { store, fetchDogBreeds, searchDogBreeds, setSearchDogBreeds, setIsLoading };
}

export const dogsState = createDogsStore();
