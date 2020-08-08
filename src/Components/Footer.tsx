import * as React from "react";
import styles from "../Styles/Footer.module.css";
import { ImageLinkProps } from "../Types";

const infoDetails = [
	{
		src: "https://image.flaticon.com/icons/png/128/25/25231.png",
		alt: "Github Profile",
		href: "https://github.com/mastrero",
	},
	{
		src: "https://image.flaticon.com/icons/png/128/61/61109.png",
		alt: "LinkedIn Profile",
		href: "https://linkedin.com/in/arun-kumar-n/",
	},
	{
		src: "https://image.flaticon.com/icons/png/128/54/54215.png",
		alt: "Email Address",
		href: "mailto:arunaiekhil@gmail.com",
	},
];

const Footer = (): JSX.Element => (
	<footer className={styles.footer}>
		<h3>ArunKumar Nadikattu</h3>
		<div className={styles.aboutMe}>
			{infoDetails.map((item, index) => (
				<ImageLink key={index} src={item.src} alt={item.alt} href={item.href} />
			))}
		</div>
		<h4>&copy; 2020 GeekTrust Finding Falcone Challenge</h4>
	</footer>
);

export default Footer;

const ImageLink = (props: ImageLinkProps): JSX.Element => (
	<a href={props.href} rel='noopener noreferrer' target='_blank'>
		<img src={props.src} alt={props.alt} loading='lazy' />
	</a>
);
