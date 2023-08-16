import { action, map, task } from "nanostores";

type TDogs = {
	[key: string]: string[];
};

type DogsStore = {
	isLoading: boolean;
	dogs: TDogs;
};

function createDogsStore() {
	const initialState = {
		isLoading: false,
		dogs: {},
	};

	const store = map<DogsStore>(initialState);

	const fetchDogBreeds = action(store, "fetchDogBreeds", store => {
		store.setKey("isLoading", true);

		task(async () => {
			try {
				const data = await fetch("https://dog.ceo/api/breeds/list/all").then(res => {
					if (res.ok) return res.json();
				});
				console.log(data);
				store.setKey("dogs", data);
			} catch (e) {
				console.log(e);
			} finally {
				store.setKey("isLoading", false);
			}
		}).catch(console.log);
	});

	return { store, fetchDogBreeds };
}

export const dogsState = createDogsStore();
