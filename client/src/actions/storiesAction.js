import axios from 'axios';

import {
	GET_STORIES,
	GET_CURRENT_STORY,
	GET_ERRORS,
	CLEAR_ERRORS,
	CREATE_STORY,
	CLEAR_STORY,
	DELETE_STORY,
	UPDATE_STORY
} from './types';

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

export const deleteStory = (id) => (dispatch) => {
	axios
		.delete(`/api/stories/${id}`)
		.then((res) => {
			dispatch({
				type: DELETE_STORY,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

export const updateStory = (id, storyData) => (dispatch) => {
	axios.post(`/api/stories/${id}`, { ...storyData }).then((res) => {
		dispatch({
			type: UPDATE_STORY,
			payload: res.data
		});
	});
};

export const clearStory = () => (dispatch) => {
	dispatch({
		type: CLEAR_STORY
	});
};
