import * as actions from './actionTypes'

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
