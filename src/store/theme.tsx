import { TThemeStore } from "@/types/general";
import { action, map } from "nanostores";

function createThemeStore() {
	const initialState = {
		darkTheme: false,
	};

	const store = map<TThemeStore>(initialState);

	const setIsDarkTheme = action(store, "setIsDarkTheme", (store, value: boolean) => {
		store.setKey("darkTheme", value);
	});

	return { store, setIsDarkTheme };
}

export const themeState = createThemeStore();
