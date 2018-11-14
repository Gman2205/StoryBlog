import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authAction';
import jwt_decode from 'jwt-decode';

import Main from './components/Main';
import Navbar from './components/Navbar';

const token = localStorage.getItem('token');
if (token) {
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<Navbar />
					<Main />
				</div>
			</Provider>
		);
	}
}

export default App;
