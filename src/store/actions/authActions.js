import * as actions from './actionTypes';
import { API_HOST } from '../../config/config';
const axios = require('axios');

export const signin = (email, password, firebase, history, location) => async dispatch => {
    dispatch({
        type: actions.SIGNIN_START
    })
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch({ type: actions.SIGNIN_SUCCESS });
            })
            .catch((err) => {
                dispatch({
                    type: actions.SIGNIN_FAIL,
                    payload: err.message
                });
            });
    } catch (err) {
        dispatch({ type: actions.SIGNIN_FAIL, payload: err.message });
    }
};

export const checkemail = (email) => async dispatch => {
    dispatch({ type: actions.CHECK_EMAIL_START });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        await axios.post(API_HOST + '/check-email', email, config);
        dispatch({ type: actions.CHECK_EMAIL_SUCCESS });
    } catch (err) {
        if ('email' in err.response.data.message) {
            dispatch({
                type: actions.CHECK_EMAIL_FAIL,
                payload: err.response.data.message && err.response.data.message.email
            });
        } else {
            dispatch({
                type: actions.CHECK_EMAIL_FAIL,
                payload: err.response.data.message && err.response.data.message._schema[0]
            });
        }

    }
};

export const signup = (details) => async dispatch => {
    dispatch({ type: actions.SIGNUP_START });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        await axios.post(API_HOST + '/register', details, config);
        dispatch({ type: actions.SIGNUP_SUCCESS });
    } catch (err) {
        dispatch({
            type: actions.SIGNUP_FAIL,
            payload: err.response.data.message
        });
    }
};

export const signOut = (firebase) => async dispatch => {
    firebase.auth().signOut().then(() => {
        dispatch({ type: actions.SIGN_OUT_SUCCESS })
        dispatch({ type: actions.GET_SCANS_CLEAR })
        dispatch({ type: actions.GET_GCP_ZONES_CLEAR })
        dispatch({ type: actions.GET_ZONE_LIST_CLEAR })
        dispatch({ type: actions.CLEAR_SELECTED_SCANS_QUEUE })
       // window.location.reload();
    }).catch((error) => {
        dispatch({
            type: actions.SIGN_OUT_FAIL,
            payload: error
        })
    });
}
