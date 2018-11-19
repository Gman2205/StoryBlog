import { GET_CURRENT_STORY, GET_STORIES, CREATE_STORY, CLEAR_STORY, DELETE_STORY } from '../actions/types';

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
		case CLEAR_STORY:
			return {
				...state,
				currentStory: {}
			};
		case CREATE_STORY:
			console.log(action.payload);
			return {
				...state
			};
		case DELETE_STORY:
			console.log(action.payload);
			return {
				...state
			};
		default:
			return state;
	}
}
