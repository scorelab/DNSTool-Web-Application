import * as actions from '../actions/actionTypes'

const initState = {
    signIn: {
        isloading: false,
        error: null
    },
    email: {
        error: null,
        correct: false,
    }
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.SIGNIN_START:
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    isloading: true
                }
            }
        case actions.SIGNIN_FAIL:
            return {
                ...state,
                signIn: {
                    isloading: false,
                    error: action.payload
                }
            }
        case actions.SIGNIN_SUCCESS:
            return {
                ...state,
                signIn: {
                    ...state.signIn,
                    isloading: false,
                }
            }
        case actions.CHECK_EMAIL_FAIL:
            return {
                ...state,
                email: {
                    correct: false,
                    error: action.payload
                }
            }
        case actions.CHECK_EMAIL_SUCCESS:
            return {
                ...state,
                email: {
                    error: null,
                    correct: true
                }
            }
        default:
            return state
    }
}

export default authReducer;