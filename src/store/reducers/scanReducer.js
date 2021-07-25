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
    createScan: {
        isloading: false,
        message: null,
        error: null
    }
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
                    ...state.zonelist,
                    data: action.payload,
                    isloading: false,
                }
            }
        //Get GCP Zone List
        case actions.GET_GCP_ZONES_START:
            return {
                ...state,
                gcpzones: {
                    ...state.gcpzones,
                    isloading: true
                }
            }
        case actions.GET_GCP_ZONES_SUCCESS:
            return {
                ...state,
                gcpzones: {
                    ...state.gcpzones,
                    data: action.payload,
                    isloading: false,
                }
            }

        case actions.GET_GCP_ZONES_FAIL:
            return {
                ...state,
                gcpzones: {
                    ...state.gcpzones,
                    isloading: false,
                    error: action.payload
                }
            }
        //Create Scan
        case actions.CREATE_SCAN_START:
            return {
                ...state,
                createScan: {
                    ...state.createScan,
                    isloading: true
                }
            }
        case actions.CREATE_SCAN_SUCCESS:
            return {
                ...state,
                createScan: {
                    ...state.createScan,
                    isloading: false,
                    message: action.payload
                }
            }

        case actions.CREATE_SCAN_FAIL:
            return {
                ...state,
                createScan: {
                    ...state.createScan,
                    isloading: false,
                    error: action.payload
                }
            }
        case actions.CREATE_SCAN_CLEAR:
            return {
                ...state,
                createScan: {
                    isloading: false,
                    error: null,
                    message: null
                }
            }
        default:
            return state
    }
}

export default scanReducer;