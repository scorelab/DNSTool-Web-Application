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
    },
    scanlist: {
        isloading: false,
        data: [],
        error: null
    },
    selectedScanList: {
        data: []
    },
    deleteScan: {
        isloading: false,
        error: null,
        message: null
    },
    downloadKeyFile: {
        isloading: false,
        error: null,
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
        //Get Scans
        case actions.GET_SCANS_START:
            return {
                ...state,
                scanlist: {
                    ...state.scanlist,
                    isloading: true
                }
            }
        case actions.GET_SCANS_SUCCESS:
            return {
                ...state,
                scanlist: {
                    ...state.scanlist,
                    data: action.payload,
                    isloading: false,
                }
            }
        case actions.GET_SCANS_FAIL:
            return {
                ...state,
                scanlist: {
                    ...state.scanlist,
                    isloading: false,
                    error: action.payload
                }
            }
        //Delete Scan
        case actions.DELETE_SCAN_START:
            return {
                ...state,
                deleteScan: {
                    ...state.deleteScan,
                    isloading: true
                }
            }
        case actions.DELETE_SCAN_SUCCESS:
            return {
                ...state,
                deleteScan: {
                    ...state.deleteScan,
                    message: action.payload,
                    isloading: false,
                }
            }
        case actions.DELETE_SCAN_FAIL:
            return {
                ...state,
                deleteScan: {
                    ...state.deleteScan,
                    isloading: false,
                    error: action.payload
                }
            }
        //Select Scan Queue
        case actions.ADD_TO_SELECTED_SCANS_QUEUE:
            return {
                ...state,
                selectedScanList: {
                    data: action.payload,

                }
            }
        case actions.CLEAR_SELECTED_SCANS_QUEUE:
            return {
                ...state,
                selectedScanList: {
                    data: [],
                }
            }
        //Download File
        case actions.DOWNLOAD_FILE_START:
            return {
                ...state,
                downloadKeyFile: {
                    ...state.downloadKeyFile,
                    isloading: true
                }
            }
        case actions.DOWNLOAD_FILE_SUCCESS:
            return {
                ...state,
                downloadKeyFile: {
                    error: false,
                    isloading: false,
                }
            }
        case actions.DOWNLOAD_FILE_FAIL:
            return {
                ...state,
                downloadKeyFile: {
                    isloading: false,
                    error: action.payload
                }
            }
        case actions.DOWNLOAD_FILE_STATE_CLEAR:
            return {
                ...state,
                downloadKeyFile: {
                    isloading: false,
                    error: null
                }
            }
        default:
            return state
    }
}

export default scanReducer;