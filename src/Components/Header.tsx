import * as React from "react";
import styles from "../Styles/Header.module.css";

const Header: React.FC = () => (
	<div className={styles.navbarWrapper}>
		<nav className={styles.navbar}>
			<h2>Finding Falcone</h2>
			<div className={styles.links}>
				<a href='https://www.geektrust.in/' rel='noopener noreferrer' target='_blank'>
					GEEKTRUST.IN
				</a>
			</div>
		</nav>
	</div>
);

export default Header;
