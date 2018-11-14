import axios from 'axios';

import { GET_STORIES, GET_CURRENT_STORY, GET_ERRORS, CLEAR_ERRORS, CREATE_STORY } from './types';

export const getStories = () => (dispatch) => {
	axios
		.get('/api/stories')
		.then((res) => {
			dispatch({
				type: GET_STORIES,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

export const getCurrentStory = (id) => (dispatch) => {
	axios
		.get(`/api/stories/${id}`)
		.then((res) => {
			dispatch({
				type: GET_CURRENT_STORY,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

export const createStory = (storyData) => (dispatch) => {
	axios
		.post('/api/stories', { ...storyData })
		.then((res) => {
			dispatch({
				type: CREATE_STORY,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};
