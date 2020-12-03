// Import actionType constants
import axios from 'axios';
import { LOG_IN_SUCCESS, SET_ERRORS, REQUEST_SEND, REQUEST_ACCEPT } from '../actionType';

export const registerCustomer = (table) => (dispatch) => {
	//dispatch(setLoading());
	axios
		.post('/api/admin/login', table)
		.then((res) => {
			const user = res.data;
			dispatch(loginSuccess(user));
		})
		.catch((err) => {
			console.log('THIS IS THE AUTH ERROR', err);
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const checkCustomer = async(id) =>{
	try {
		const res = await axios.get(`/api/table/customers/${id}`);
		return res.data;
	} catch (error) {
		console.log('THIS IS THE AUTH ERROR', error);
		throw new Error('Could not check customer');
	}
};

export const sendRequest = async(customer) =>{
	try {
		const res = await axios.post('/api/table/requests', customer);
		return res.data;
	} catch (error) {
		console.log('THIS IS THE AUTH ERROR', error);
		throw new Error('Could not send request');
	}
};

export const checkRequest = async(id) =>{
	try {
		const res = await axios.get(`/api/table/requests/${id}`);
		return res.data;
	} catch (error) {
		console.log('THIS IS THE AUTH ERROR', error);
		throw new Error('Could not check customer');
	}
};

// Set current user
export const loginSuccess = (data) => {
	return {
		type: LOG_IN_SUCCESS,
		data
	};
};

export const setUser = (data) =>{
	return {
		type:REQUEST_ACCEPT,
		data
	}	
}

// Set current user
export const requestSent = () => {
	return {
		type: REQUEST_SEND
	};
};
