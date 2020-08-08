import React from "react";
import { SelectPlanetProps } from "../Types";

const SelectPlanet: React.FC<SelectPlanetProps> = ({ wrapperClass, selectClass, onChange, fly, planets }): JSX.Element => {
	return (
		<div className={wrapperClass}>
			<select onChange={onChange} className={selectClass} name={fly.name} value={fly.planet}>
				<option>{fly.planet}</option>
				{planets.map((planet: any) => (
					<option key={planet.name} value={planet.name}>
						{planet.name}
					</option>
				))}
			</select>
			<br />
		</div>
	);
};

export default SelectPlanet;
