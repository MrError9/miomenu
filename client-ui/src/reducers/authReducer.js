// Import custom components
import { LOG_IN_LOADING, SET_CURRENT_USER } from '../actions/actionType';

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
		case SET_CURRENT_USER:
			return Object.assign({}, state, {
				isAuthenticated: action.data === {} ? false : true,
				isLoading: false,
				user: action.data
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
