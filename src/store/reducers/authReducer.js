import * as actions from '../actions/actionTypes'

const initState = {
    signIn: {
        isloading: false,
        error: null
    },
    email: {
        error: null,
        correct: false,
    },
    signUp: {
        isloading: false,
        error: null,
        isSuccess: false
    },
    verificationEmail: {
        error: null,
        msg: null
    }
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        //Sign In
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
        //Check Mail
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
        //Sign Up
        case actions.SIGNUP_START:
            return {
                ...state,
                signUp: {
                    isSuccess: false,
                    error: null,
                    isloading: true
                }
            }
        case actions.SIGNUP_FAIL:
            return {
                ...state,
                signUp: {
                    ...state.signUp,
                    isloading: false,
                    error: action.payload
                }
            }
        case actions.SIGNUP_SUCCESS:
            return {
                ...state,
                signUp: {
                    ...state.signUp,
                    isloading: false,
                    isSuccess: true
                }
            }
        //Send Verification Email
        case actions.SEND_EMAIL_VERIFICATION:
            return {
                ...state,
                verificationEmail: {
                    error: false,
                    msg: action.payload
                }
            }
        case actions.SEND_EMAIL_VERIFICATION_FAIL:
            return {
                ...state,
                verificationEmail: {
                    error: true,
                    msg: action.payload
                }
            }
        default:
            return state
    }
}

export default authReducer;