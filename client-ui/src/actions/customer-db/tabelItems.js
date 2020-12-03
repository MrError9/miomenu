// Import actionType constants
import axios from 'axios';
import { LOG_IN_SUCCESS, SET_ERRORS } from '../actionType';

export const registerCustomer = (table) => dispatch => {
	dispatch(setLoading());
	axios
		.post('/api/admin/login', table)
		.then((res) => {
			const user = res.data;
			dispatch(loginSuccess(user));
		})
		.catch((err) => {
			console.log('THIS IS THE AUTH ERROR',err	)
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

// Set current user
export const loginSuccess = (data) => {
	return {
		type: LOG_IN_SUCCESS,
		data
	};
};

// Set loading state
export const setLoading = () => {
	return {
		type: LOG_IN_LOADING
	};
};

