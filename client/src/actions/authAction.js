import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { CURRENT_USER, GET_ERRORS, CLEAR_ERRORS, LOGOUT_USER } from './types';

export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/users/login', userData)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem('token', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

export const setCurrentUser = (decoded) => {
	return {
		type: CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => {
	return {
		type: LOGOUT_USER
	};
};

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
