import React from "react";
import styles from "../Styles/Page404.module.css";

export default function Page404(): JSX.Element {
	return (
		<section className={styles.bg}>
			<div className={styles.control}>
				<img src='https://media.tenor.com/images/62e8f689458bb94ec020b4caab09c842/tenor.gif' alt='404' loading='lazy' />
				<div className={styles.content}>
					<h2>OOPS!! You reached edge of the Cliff</h2>
					<h3>The page you are looking for does not exist.</h3>
					<button
						onClick={() => {
							window.location.pathname = `${process.env.PUBLIC_URL}`;
						}}>
						Go to Home
					</button>
				</div>
			</div>
			<div />
		</section>
	);
}
