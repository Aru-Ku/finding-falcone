import React from "react";
import { SelectVehicleProps } from "../Types";

const SelectVechicle: React.FC<SelectVehicleProps> = ({ wrapperClass, selectClass, onChange, fly }): JSX.Element => {
	return (
		<div className={wrapperClass}>
			<select onChange={onChange} className={selectClass} name={fly.name} value={fly.vehicle}>
				<option>{fly.vehicle}</option>
				{fly.vehicles.map(
					(vehicle: any) =>
						vehicle.total_no > 0 && (
							<option key={vehicle.name} value={vehicle.name}>
								{vehicle.name} ({vehicle.total_no} avialable)
							</option>
						)
				)}
			</select>
		</div>
	);
};

export default SelectVechicle;
