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
						<Route exact path='/404' component={Page404} />
						<Route exact path='/solve' component={Solve} />
						<Route exact path='/solution' component={Solution} />
						<Route exact path='/' component={Problem} />
						<Redirect to='/404' />
					</Switch>
				</Router>
			</StoreProvider>
			<Footer />
		</div>
	);
};

export default App;
