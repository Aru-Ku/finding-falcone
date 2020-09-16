import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { StoreProvider } from "./Store";
import loadable from "@loadable/component";

const Header = loadable(() => import("./Components/Header"));
const Footer = loadable(() => import("./Components/Footer"));
const Solve = loadable(() => import("./Components/Solve"));
const Problem = loadable(() => import("./Components/Problem"));
const Solution = loadable(() => import("./Components/Solution"));
const Page404 = loadable(() => import("./Components/Page404"));

const App = (): JSX.Element => {
	return (
		<div className='wrapper'>
			<Header />
			<StoreProvider>
				<Router>
					<Switch>
						<Route exact path={`${process.env.PUBLIC_URL}/solve`} component={Solve} />
						<Route exact path={`${process.env.PUBLIC_URL}/solution`} component={Solution} />
						<Route exact path={`${process.env.PUBLIC_URL}/404`} component={Page404} />
						<Route exact path={`${process.env.PUBLIC_URL}/`} component={Problem} />
						<Redirect to={`${process.env.PUBLIC_URL}/404`} />
					</Switch>
				</Router>
			</StoreProvider>
			<Footer />
		</div>
	);
};

export default App;
