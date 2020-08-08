import React from "react";
import { LoaderProps } from "../Types";

const Loader: React.FC<LoaderProps> = ({ loading }): JSX.Element => {
	return loading && <div className='loader loader-default is-active' />;
};

export default Loader;
