import * as actions from '../actions/actionTypes'

const initState = {
    isloading: false,
    error: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.SIGNIN_START:
            return {
                ...state,
                isloading: true
            }
        case actions.SIGNIN_FAIL:
            return {
                isloading: false,
                error: action.payload
            }
        case actions.SIGNIN_SUCCESS:
            return {
                ...state,
                isloading: false,
            }
        default:
            return state
    }
}

export default authReducer;