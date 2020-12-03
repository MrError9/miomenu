import {combineReducers} from 'redux';

// Import custom components
import authReducer from './authReducer';
import customerReducer from './customerReducer';
import errorReducer from './errorReducer';

const appReducer = () => combineReducers({
    auth: authReducer,
    customer:customerReducer,
    errors:errorReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;