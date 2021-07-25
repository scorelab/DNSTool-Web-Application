import * as actions from '../actions/actionTypes'

const initState = {
    zonelist: {
        isloading: false,
        data: [],
        error: null
    },
    gcpzones: {
        isloading: false,
        data: [],
        error: null,
    },
}

const scanReducer = (state = initState, action) => {
    switch (action.type) {
        //Get Zone List
        case actions.GET_ZONE_LIST_START:
            return {
                ...state,
                zonelist: {
                    ...state.zonelist,
                    isloading: true
                }
            }
        case actions.GET_ZONE_LIST_FAIL:
            return {
                ...state,
                zonelist: {
                    ...state.zonelist,
                    isloading: false,
                    error: action.payload
                }
            }
        case actions.GET_ZONE_LIST_SUCCESS:
            return {
                ...state,
                zonelist: {
                    ...state.signIn,
                    data: action.payload,
                    isloading: false,
                }
            }
        //Get GCP Zone List
        case actions.GET_GCP_ZONES_START:
            return {
                ...state,
                gcpzones: {
                    ...state.zonelist,
                    isloading: true
                }
            }
        case actions.GET_GCP_ZONES_FAIL:
            return {
                ...state,
                gcpzones: {
                    ...state.zonelist,
                    isloading: false,
                    error: action.payload
                }
            }
        case actions.GET_ZONE_LIST_SUCCESS:
            return {
                ...state,
                gcpzones: {
                    ...state.signIn,
                    data: action.payload,
                    isloading: false,
                }
            }

        default:
            return state
    }
}

export default scanReducer;