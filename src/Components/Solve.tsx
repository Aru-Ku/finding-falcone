import React, { useContext, useState, useEffect, useCallback } from "react";
import { Store } from "../Store";
import { useHistory } from "react-router-dom";
import { fetchToken, findQueen, fetchVehiclesAndPlanets } from "../Axios";
import styles from "../Styles/Solve.module.css";
import SelectPlanet from "../UI/SelectPlanet";
import SelectVehicle from "../UI/SelectVehicle";
import SelectImage from "../UI/SelectImage";
import Loader from "../UI/Loader";
import { ContextProps, VehicleType, PlanetType, FlyType } from "../Types";

const Solve = (): JSX.Element => {
	const { state, dispatch } = useContext<ContextProps>(Store);
	const history = useHistory();
	const [loading, setLoading] = useState<boolean>(true);
	const [vehicles, setVehicles] = useState<Array<VehicleType>>([]);
	const [planets, setPlanets] = useState<Array<PlanetType>>([]);
	const [totalTime, setTotalTime] = useState<number>(0);
	const [button, setButton] = useState<boolean>(false);
	const [originalVehicles, setOriginalvehicles] = useState<Array<VehicleType>>([]);
	const [originalPlanets, setOriginalPlanets] = useState<Array<PlanetType>>([]);

	const [fly, setFly] = useState<Array<FlyType>>([
		{ name: "planet-1", planet: "Planet 1", vehicle: "Vehicle", time: 0, selected: false, vehicles: [] },
		{ name: "planet-2", planet: "Planet 2", vehicle: "Vehicle", time: 0, selected: false, vehicles: [] },
		{ name: "planet-3", planet: "Planet 3", vehicle: "Vehicle", time: 0, selected: false, vehicles: [] },
		{ name: "planet-4", planet: "Planet 4", vehicle: "Vehicle", time: 0, selected: false, vehicles: [] },
	]);

	const fetchers = useCallback(async () => {
		let state_vehicles: Array<VehicleType> = [...state.vehicles];
		let state_planets: Array<PlanetType> = [...state.planets];

		if (state_vehicles.length === 0 || state_planets.length === 0) {
			await fetchVehiclesAndPlanets()
				.then((response) => {
					dispatch({ type: "FETCH_VEHICLES", vehicles: response[0].data });
					dispatch({ type: "FETCH_PLANETS", planets: response[1].data });
					state_vehicles = response[0].data;
					state_planets = response[1].data;
				})
				.catch((e) => {
					// Do it in more elegant way OR Repeting Fetching
					alert("Couldn't get data. Reload Page or Try after some time");
					console.error(e); // Log fro adition INFO.
				});
		}
		setOriginalPlanets(state_planets);
		setOriginalvehicles(state_vehicles);
		setVehicles(state_vehicles);
		setPlanets(state_planets);
		setLoading(false);
	}, [dispatch, state, setLoading, setOriginalPlanets, setOriginalvehicles, setPlanets, setVehicles]);

	const handlers = {
		changePlanet: (e: React.ChangeEvent<HTMLInputElement>): void => {
			let currentSelected = fly.filter((f: any) => f.name === e.target.name);

			// REMOVE PLANET IF NOT SELECTED
			if (!currentSelected[0].selected) {
				let planetToRemove = planets.filter((p: any) => p.name !== e.target.value);
				setPlanets(planetToRemove);
			} else {
				let oldPlanet = originalPlanets.filter((p: any) => p.name === currentSelected[0].planet);
				let pts = oldPlanet.concat(planets);
				let planet = pts.filter((p: any) => p.name !== e.target.value);
				setPlanets(planet);
			}

			// SET SELECTED & VEHICLES
			let currentFly = [...fly];
			let selectedPlanet: any = planets.filter((p: any) => p.name === e.target.value);
			let ev = vehicles.filter((v: any) => v.max_distance >= selectedPlanet[0].distance);
			currentFly.map((f: any) => {
				if (f.name === e.target.name) {
					f.selected = true;
					f.planet = e.target.value;
					f.vehicles = ev;
					f.time = 0;
				}
				return null;
			});

			setFly(currentFly);
		},
		changeVehicle: (e: React.ChangeEvent<HTMLInputElement>): void => {
			let currentFly = [...fly];
			currentFly.map((f: any) => {
				if (f.name === e.target.name) {
					f.vehicle = e.target.value;
				}
				let vehicles = [...f.vehicles];
				vehicles.map((v: any) => {
					if (v.name === e.target.value) {
						v.total_no = v.total_no - 1;
					}
					return null;
				});
				return null;
			});
			let finalFly: any = handlers.calculateIndividualTime(e, currentFly);
			handlers.calculateTotalTime();
			setFly(finalFly);
			handlers.showButton();
		},
		calculateIndividualTime: (e: React.ChangeEvent<HTMLInputElement>, fleet: Array<FlyType>): Array<FlyType> => {
			let currentFly = [...fleet];
			let flewVehicle = currentFly.filter((f: any) => f.name === e.target.name)[0];
			let vehicle: any = originalVehicles.filter((v: any) => flewVehicle.vehicle === v.name)[0];
			let planet: any = originalPlanets.filter((p: any) => flewVehicle.planet === p.name)[0];
			currentFly.map((f: any) => {
				if (f.name === e.target.name) f.time = planet.distance / vehicle.speed;
				return null;
			});
			return currentFly;
		},
		calculateTotalTime: (): void => {
			let tt = 0; // Total Time of Travel
			fly.map((f: any) => {
				return (tt += f.time);
			});
			setTotalTime(tt);
		},
		showButton: () => {
			let cf = [...fly]; // CurrentFly := To reduce name repetition
			let allSelected = cf.every((fly) => fly.vehicle !== "Vehicle");
			if (allSelected) setButton(true);
		},
		reset: () => {
			setFly([
				{ name: "planet-1", planet: "Planet 1", vehicle: "Vehicle", time: 0, selected: false, vehicles: [] },
				{ name: "planet-2", planet: "Planet 2", vehicle: "Vehicle", time: 0, selected: false, vehicles: [] },
				{ name: "planet-3", planet: "Planet 3", vehicle: "Vehicle", time: 0, selected: false, vehicles: [] },
				{ name: "planet-4", planet: "Planet 4", vehicle: "Vehicle", time: 0, selected: false, vehicles: [] },
			]);
			setLoading(true);
			setPlanets([]);
			setVehicles([]);
			setTotalTime(0);
			setButton(false);
			fetchers();
		},
		solve: async () => {
			let token: string = "";
			let result = {};
			await fetchToken()
				.then((response) => {
					token = response.data.token;
				})
				.catch((e) => console.log(e));
			let planet_names: Array<string> = [];
			let vehicle_names: Array<string> = [];
			fly.map((f: any) => {
				planet_names.push(f.planet);
				vehicle_names.push(f.vehicle);
				return null;
			});
			await findQueen({ token, planet_names, vehicle_names })
				.then((res) => {
					result = res.data;
				})
				.catch((e) => (result = { error: e })); // Carry Error to next Page
			history.push({
				pathname: `${process.env.PUBLIC_URL}/solution`,
				state: { planet_names, vehicle_names, result, time: totalTime }, // Carry Fields to Next Page
			});
		},
	};

	useEffect(() => {
		fetchers();
	}, [fetchers]);

	return (
		<div className={styles.container}>
			{loading ? (
				<Loader loading={loading} />
			) : (
				<>
					<h1>Select planets and relevant vehicles for searching</h1>
					<div className={styles.topBar}>
						<button onClick={handlers.reset}>RESET</button>
						<p>Total Time: {totalTime}</p>
					</div>
					<hr />
					<div className={styles.selections}>
						{fly.map((f) => {
							return (
								<div key={f.name} className={styles.planetbox}>
									<SelectPlanet
										wrapperClass={styles.wrapper}
										selectClass={styles.select}
										planets={planets}
										onChange={handlers.changePlanet}
										fly={f}
									/>
									{f.selected && <img src={SelectImage(f.planet)} alt={f.planet} loading='lazy' />}
									{f.selected && (
										<SelectVehicle wrapperClass={styles.wrapper} selectClass={styles.select} onChange={handlers.changeVehicle} fly={f} />
									)}
									{f.vehicle !== "Vehicle" && "Time Taken: " + f.time}
									{f.vehicle !== "Vehicle" && <img src={SelectImage(f.vehicle)} alt={f.vehicle} loading='lazy' />}
								</div>
							);
						})}
					</div>
					{button && (
						<button onClick={handlers.solve} className={styles.solve}>
							Search for Queen
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default Solve;
