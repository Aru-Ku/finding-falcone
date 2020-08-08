import React, { useReducer, createContext } from "react";
import { State, Actions, ContextProps } from "../Types";

export const initialstate = {
	vehicles: [],
	planets: [],
};

export const Store = createContext({} as ContextProps);

export function reducer(state: State, action: Actions): State {
	switch (action.type) {
		case "FETCH_VEHICLES":
			return { ...state, vehicles: action.vehicles };
		case "FETCH_PLANETS":
			return { ...state, planets: action.planets };
		default:
			return state; // Fail case
	}
}

export function StoreProvider(props: any) {
	const [state, dispatch] = useReducer(reducer, initialstate);
	const value = { state, dispatch };

	return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
