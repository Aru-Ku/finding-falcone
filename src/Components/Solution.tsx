import React, { useEffect, useState, useCallback } from "react";
import styles from "../Styles/Solution.module.css";
import { useHistory } from "react-router-dom";
import { fetchToken, findQueen } from "../Axios";
import Loader from "../UI/Loader";
import { SolutionProps } from "../Types";

const Solution: React.FC<SolutionProps> = (props: any): JSX.Element => {
	const [token, setToken] = useState<string>("");
	const history = useHistory();
	const [loading, setLoading] = useState<boolean>(true);
	const [result, setResult] = useState<any>({});
	let { planet_names, vehicle_names, time } = props.location.state || { planet_names: [], vehicle_names: [], time: "" };

	const handlers = {
		getToken: useCallback(async () => {
			await fetchToken()
				.then((response) => {
					setToken(response.data.token);
				})
				.catch((e) => {
					// Do it in more elegant way OR Repeting Fetching
					alert("Couldn't get data. Reload Page or Try after some time");
					console.error(e); // Log fro adition INFO.
				});
		}, [setToken]),
		findQueen: async () => {
			await findQueen({ token, planet_names, vehicle_names })
				.then((res) => {
					setResult(res.data);
				})
				.catch((e) => {
					// Do it in more elegant way OR Repeting Fetching
					alert("Couldn't get data. Reload Page or Try after some time");
					console.error(e); // Log fro adition INFO.
				});
		},
		playAgain: () => {
			history.goBack();
		},
		submitAgain: async () => {
			await handlers.getToken();
			handlers.findQueen();
		},
	};

	useEffect(() => {
		let { result } = props.location.state || {};
		setResult(result);
		setLoading(false);
	}, [props]);

	return (
		<section className={styles.wrapper}>
			<Loader loading={loading} />
			<div className={styles.model}>
				{!result ? (
					<React.Fragment>
						<img loading='lazy' src='https://i.imgur.com/3RwfeTs.gif' alt='celebrate' />
						<h4>Please help King Shan, to find Queen Falcone</h4>
						<button onClick={() => history.replace("/solve")}>Help</button>
					</React.Fragment>
				) : result.error ? (
					<React.Fragment>
						<h2>Token invalid / not initialised</h2>
						<button onClick={handlers.submitAgain}>Get new token</button>
					</React.Fragment>
				) : result.status === "success" ? (
					<React.Fragment>
						<img
							loading='lazy'
							src='https://i.pinimg.com/originals/9b/96/79/9b96799d061a0528da6b0da7bac5374a.gif'
							alt='celebrate'
						/>
						<h2>
							Hurray!! Queen found in <span>{result.planet_name}</span> planet
						</h2>
						<h2>
							Time Taken: <span>{time}</span>
						</h2>
					</React.Fragment>
				) : (
					<React.Fragment>
						<h2>OOPS!! Queen not found</h2>
						<button onClick={handlers.playAgain}>Play Again</button>
					</React.Fragment>
				)}
			</div>
		</section>
	);
};

export default Solution;
