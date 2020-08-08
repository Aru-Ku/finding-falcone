import React, { Dispatch } from "react";

// FORM EVENT TYPES
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

// FETCH / AXIOS TYPES
export type FindData = {
	token: string;
	planet_names: Array<string>;
	vehicle_names: Array<string>;
};

export type VehicleType = {
	max_distance: number;
	name: string;
	speed: number;
	total_no: number;
};

export type PlanetType = {
	name: string;
	distance: number;
};

// UI TYPES
export type EmojiProps = {
	label: string;
	emoji: string;
};

export type LoaderProps = {
	loading: boolean | Array<any> | object | any;
};

export type SelectPlanetProps = {
	wrapperClass: string;
	selectClass: string;
	fly: object | any;
	planets: object | any;
	onChange?: ChangeEvent | any;
};

export type SelectVehicleProps = {
	wrapperClass: string;
	selectClass: string;
	fly: object | any;
	onChange?: ChangeEvent | any;
};

// REDUCER / STORE TYPES
export type State = {
	vehicles: Array<VehicleType>;
	planets: Array<PlanetType>;
};

export type ContextProps = {
	state: State;
	dispatch: Dispatch<Actions>;
};

export type Actions =
	| { type: "FETCH_VEHICLES"; vehicles: Array<VehicleType> }
	| { type: "FETCH_PLANETS"; planets: Array<PlanetType> };

// TYPES IN COMPONENTS
export type ImageLinkProps = {
	src: string;
	alt: string;
	href: string;
};

export type FlyType = {
	name: string;
	planet: string;
	vehicle: string;
	time: number;
	selected: boolean;
	vehicles: Array<VehicleType>;
};

export type SolutionProps = {
	planet_names: Array<string>;
	vehicle_names: Array<string>;
	time: number;
	result: { planet_name: string; success: string } | { success: string } | { error: string | any };
};
