import { CURRENT_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
	isAuthenticated: false,
	user: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CURRENT_USER:
			return {
				...state,
				isAuthenticated: true,
				user: { ...action.payload }
			};
		case LOGOUT_USER:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				user: {}
			};
		default:
			return state;
	}
}
