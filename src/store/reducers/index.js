import { combineReducers } from "redux";
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import scanReducer from './scanReducer'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    authstatus: authReducer,
    scanData: scanReducer
});

export default rootReducer