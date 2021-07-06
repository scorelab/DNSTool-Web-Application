import * as actions from './actionTypes';
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
        const response = await axios.post('/check-email', email, config);
        dispatch({ type: actions.CHECK_EMAIL_SUCCESS });
    } catch (err) {
        dispatch({
            type: actions.CHECK_EMAIL_FAIL,
            payload: err.response.data.message._schema[0]
        });
    }
};
