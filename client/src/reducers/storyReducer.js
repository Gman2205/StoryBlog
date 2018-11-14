import { GET_CURRENT_STORY, GET_STORIES, CREATE_STORY } from '../actions/types';
import axios from 'axios';

const initialState = {
	stories: [],
	currentStory: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_STORIES:
			return {
				...state,
				stories: action.payload
			};
		case GET_CURRENT_STORY:
			return {
				...state,
				currentStory: { ...action.payload }
			};
		case CREATE_STORY:
			console.log(action.payload);
			return {
				...state
			};
		default:
			return state;
	}
}
