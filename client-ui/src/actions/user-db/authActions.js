// Import actionType constants
import axios from 'axios';
import decoder from 'jwt-decode';
import { SET_CURRENT_USER, SET_ERRORS } from '../actionType';
import store from '../../app/configureStore';

export const checkCustomer = async (id) => {
	try {
		const res = await axios.get(`/api/table/customers/${id}`);
		return res.data;
	} catch (error) {
		console.log('THIS IS THE AUTH ERROR', error);
		throw new Error('Could not check customer');
	}
};

export const loginAction = async (user) => {
	try {
		const res = await axios.post('/api/users/login', user);
		const { token } = res.data;
		console.log('token', token);
		localStorage.setItem('jwtToken', token);

		setAuthToken(token);
		const decode = decoder(token);
		return decode;
	} catch (error) {
		store.dispatch({
			type: SET_ERRORS,
			payload: error.response.data
		});
	}
};

// Log user out
export const logoutUser = () => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	store.dispatch(setCurrentUser({}));
};

export const userToken = (token) => {
	// Set auth token header auth
	try {
		setAuthToken(token);
		// Decode token and get user info and exp
		const decoded = decoder(token);
		// Set user and isAuthenticated
		store.dispatch(setCurrentUser(decoded));
	} catch (error) {
		console.log('error', error);
		alert('there is an error', error);
	}
};

export const setAuthToken = (token) => {
	if (token) {
		// Apply to every request
		axios.defaults.headers.common['Authorization'] = token;
		console.log('header is ' + token);
	} else {
		// Delete auth header
		delete axios.defaults.headers.common['Authorization'];
	}
};

// DISPATCHES
export const setCurrentUser = (data) => {
	return {
		type: SET_CURRENT_USER,
		data
	};
};
