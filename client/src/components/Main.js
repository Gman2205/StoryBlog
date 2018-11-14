import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Stories from './Stories';
import Book from './Book';
import AddStory from './AddStory';

function Main() {
	return (
		<div>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/stories/new" component={AddStory} />
				<Route path="/stories/:id" render={(props) => <Book {...props} />} /> />
				<Route path="/stories" component={Stories} />
				<Route path="/" component={Home} />
			</Switch>
		</div>
	);
}

export default Main;
