import { combineReducers } from 'redux';

import authReducer from './authReducer';
import storyReducer from './storyReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	auth: authReducer,
	stories: storyReducer,
	errors: errorReducer
});
