import React, { useEffect, useState, useContext } from "react";
import styles from "../Styles/Problem.module.css";
import { fetchVehiclesAndPlanets } from "../Axios";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import Emoji from "../UI/Emoji";
import Loader from "../UI/Loader";
import SelectImage from "../UI/SelectImage";
import { ContextProps } from "../Types";

const Problem: React.FC = (): JSX.Element => {
	const { state, dispatch } = useContext<ContextProps>(Store);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			await fetchVehiclesAndPlanets()
				.then((reponse) => {
					dispatch({ type: "FETCH_VEHICLES", vehicles: reponse[0].data });
					dispatch({ type: "FETCH_PLANETS", planets: reponse[1].data });
				})
				.catch((e) => {
					// Do it in more elegant way OR Repeting Fetching
					alert("Couldn't get data. Reload Page or Try after some time");
					console.error(e); // Log fro adition INFO.
				});
			setLoading(false);
		})();
	}, [dispatch]);

	return (
		<section className={styles.wrapper}>
			<h2>Problem Statement: </h2>
			<p className={styles.statement}>
				Our problem is set in the planet of Lengaburu…in the distant distant galaxy of Tara B. After the recent war with
				neighbouring planet Falicornia, King Shan has exiled the Queen of Falicornia for 15 years. Queen Al Falcone is now in
				hiding. But if King Shan can find her before the years are up, she will be exiled for another 15 years.
				<br />
				<br />
				King Shan has received intelligence that Al Falcone is hiding in one of six neighbouring planets. In this problem you need
				to build a UI through which King Shan can choose the planets to search, and the vehicles to use in Finding Falcone.
			</p>
			<div className={styles.buttonWrapper}>
				<Link to='/solve'>Help King Shan to find the Queen</Link>
			</div>
			<Loader loading={loading} />
			<hr />
			<div className={styles.planetsWrapper}>
				<h3>
					Potential Hideouts for Queen <Emoji emoji='👸' label='Queen' />
				</h3>
				<div className={styles.planetsList}>
					{state.planets.map((planet: any, index: number) => {
						return (
							<div key={index} className={styles.planet}>
								<img src={SelectImage(planet.name)} alt={planet.name} loading='lazy' />
								<p>{planet.name}</p>
								<p>Distance: {planet.distance}</p>
							</div>
						);
					})}
				</div>
			</div>
			<hr />
			<div className={styles.vehiclesWrapper}>
				<h3>
					Vehicles available with King <Emoji emoji='👑' label='King' />
				</h3>
				<div className={styles.vehiclesList}>
					{state.vehicles.map((vehicle: any, index: number) => {
						return (
							<div key={index} className={styles.vehicle}>
								<img src={SelectImage(vehicle.name)} alt={vehicle.name} loading='lazy' />
								<p>{vehicle.name}</p>
								<p>Speed: {vehicle.speed}</p>
								<p>Units Available: {vehicle.total_no}</p>
								<p>Max. Distance: {vehicle.max_distance}</p>
							</div>
						);
					})}
				</div>
			</div>
			<hr />
		</section>
	);
};

export default Problem;
