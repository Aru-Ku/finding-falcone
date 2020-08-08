import axios from "axios";
import { FindData } from "../Types";

axios.defaults.baseURL = "https://findfalcone.herokuapp.com/";

export const fetchVehiclesAndPlanets = () => axios.all([axios.get("/vehicles"), axios.get("/planets")]);

export const fetchToken = () =>
	axios.post("/token", "", {
		headers: {
			Accept: "application/json",
		},
	});

export const findQueen = (data: FindData) =>
	axios.post("/find", data, {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
