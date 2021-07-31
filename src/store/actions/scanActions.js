import * as actions from './actionTypes';
const axios = require('axios');

export const getZoneList = (keyword) => async dispatch => {
    dispatch({ type: actions.GET_ZONE_LIST_START });
    try {
        const response = await axios.get(`/zones/${keyword}`);
        dispatch({
            type: actions.GET_ZONE_LIST_SUCCESS,
            payload: response.data.data
        });
    } catch (err) {
        dispatch({
            type: actions.GET_ZONE_LIST_FAIL,
            payload: err.response.data.message
        });
    }
}

export const getGCPZoneList = (keyword) => async dispatch => {
    dispatch({ type: actions.GET_GCP_ZONES_START });
    try {
        const response = await axios.get(`/gcp-zones/${keyword}`);
        dispatch({
            type: actions.GET_GCP_ZONES_SUCCESS,
            payload: response.data.data
        });
    } catch (err) {
        dispatch({
            type: actions.GET_GCP_ZONES_FAIL,
            payload: err.response.data.message
        });
    }
};

export const createScan = (scanDetails, firebase) => async dispatch => {
    dispatch({ type: actions.CREATE_SCAN_START });

    const token = await firebase.auth().currentUser.getIdToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await axios.post('/scans', scanDetails, config);
        console.log(response)
        dispatch({
            type: actions.CREATE_SCAN_SUCCESS,
            payload: response.data.message
        });
    } catch (err) {
        dispatch({
            type: actions.CREATE_SCAN_FAIL,
            payload: err.response.data.message
        });
    } finally {
        dispatch({
            type: actions.CREATE_SCAN_CLEAR,
        });
    }
};

export const getScans = (firebase) => async dispatch => {
    dispatch({ type: actions.GET_SCANS_START });

    const token = await firebase.auth().currentUser.getIdToken();
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await axios.get('/scans', config);
        console.log(response)
        dispatch({
            type: actions.GET_SCANS_SUCCESS,
            payload: response.data.data
        });
    } catch (err) {
        dispatch({
            type: actions.GET_SCANS_FAIL,
            payload: err.response.data.message
        });
    }
};

export const clearSelecetedScansQueue = () => async dispatch => {
    dispatch({
        type: actions.CLEAR_SELECTED_SCANS_QUEUE
    })
};

export const deleteScan = (scanIds, firebase) => async dispatch => {
    dispatch({ type: actions.DELETE_SCAN_START });

    const token = await firebase.auth().currentUser.getIdToken();
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        let responses = []
        scanIds.map(async id => {
            let tempResponse = await axios.delete(`/scans/${id}`, config);
            responses.push(tempResponse)
        })

        Promise.allSettled([
            responses
        ]).then(values => console.log(values))

        dispatch({
            type: actions.DELETE_SCAN_SUCCESS,
            payload: `${scanIds} scans Deleted Succesfully`
        });

        await clearSelecetedScansQueue()(dispatch);
        await getScans(firebase)(dispatch);

    } catch (err) {
        dispatch({
            type: actions.DELETE_SCAN_FAIL,
            payload: "Error Something Went Wrong"
        });
    }
};

export const addToSelectedScansQueue = (scanIds) => async dispatch => {
    dispatch({
        type: actions.ADD_TO_SELECTED_SCANS_QUEUE,
        payload: scanIds
    })
};

