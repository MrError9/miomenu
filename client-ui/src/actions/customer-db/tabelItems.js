// Import actionType constants
import axios from 'axios';
import { SET_CURRENT_USER, SET_ERRORS, LOG_IN_LOADING } from '../actionType';

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
		type: SET_CURRENT_USER,
		data
	};
};

// Set loading state
export const setLoading = () => {
	return {
		type: LOG_IN_LOADING
	};
};

