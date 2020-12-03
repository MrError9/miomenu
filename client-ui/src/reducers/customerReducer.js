// Import custom components
import { REQUEST_ACCEPT, REQUEST_REJECT, REQUEST_SEND } from '../actions/actionType';

var initialState = {
	customer: {},
	isRegistered: false,
	request: 'none'
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const authReducer = (state, action) => {
	state = state || initialState;
	switch (action.type) {
		case REQUEST_SEND:
			return Object.assign({}, state, {
				customer: {},
				isRegistered: false,
				request: 'sent'
			});
		case REQUEST_ACCEPT:
			return Object.assign({}, state, {
				customer: action.data,
				isRegistered: true,
				request: 'accept'
			});
		case REQUEST_REJECT:
			return Object.assign({}, state, {
				customer: {},
				isRegistered: false,
				request: 'reject'
			});
		default:
			return state;
	}
};

export default authReducer;
