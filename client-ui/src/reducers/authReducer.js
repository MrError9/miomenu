// Import custom components
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_SUCCESS, LOG_IN_LOADING } from '../actions/actionType';

var initialState = {
	user: {},
	isAuthenticated: false,
	isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const authReducer = (state, action) => {
	state = state || initialState;

	switch (action.type) {
		case LOG_IN_SUCCESS:
			return Object.assign({}, state, {
				isAuthenticated: true,
				isLoading: false,
				user: action.data
			});
		case LOG_IN_FAILURE:
			return Object.assign({}, state, {
				isAuthenticated: false,
				isLoading: false,
				user: {},
				errorMessage: action.error.message || 'Something went wrong.'
			});
		case LOG_OUT_SUCCESS:
			return Object.assign({}, state, {
				isAuthenticated: false,
				isLoading: false,
				user: {}
			});
		case LOG_IN_LOADING:
			return Object.assign({}, state, {
				...state,
				isLoading: true
			});
		default:
			return state;
	}
};

export default authReducer;
