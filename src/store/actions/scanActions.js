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

export const downloadKeyFile = (scanId, firebase) => async dispatch => {
    dispatch({ type: actions.DOWNLOAD_FILE_START });

    const token = await firebase.auth().currentUser.getIdToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/json",
            "Authorization": `Bearer ${token}`,
        },
        responseType: 'blob'
    };

    try {
        const response = await axios.get(`/service-account/${scanId}`, config);
        console.log(response)
        dispatch({
            type: actions.DOWNLOAD_FILE_SUCCESS,
        });

        console.log(response)
        const header = response.headers['content-disposition'];
        console.log(header)
        const fileNameSplit = header.split(/attachment;\sfilename=/).filter(Boolean)
        const fileName = fileNameSplit.length === 1 ? fileNameSplit[0] : "service_account.json"
        const blob = await response.data
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.querySelector('#download').innerText = 'Download Service Account';

    } catch (err) {
        console.log(err)
        dispatch({
            type: actions.DOWNLOAD_FILE_FAIL,
            //payload: err.response.data.message
        });
    } finally {
        setTimeout(() => {
            dispatch({
                type: actions.DOWNLOAD_FILE_STATE_CLEAR,
            });
        }, 1000);
    }
};

export const updateScanState = (scanId, stateName, firebase) => async dispatch => {
    dispatch({ type: actions.UPDATE_SCAN_START });

    const token = await firebase.auth().currentUser.getIdToken();
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    let data;

    if (stateName === 'active') {
        data = { "state": 'suspend' }
    } else if (stateName === 'suspend') {
        data = { "state": 'active' }
    }

    try {
        await axios.patch(`/scans/${scanId}`, data, config);
        dispatch({
            type: actions.UPDATE_SCAN_SUCCESS,
            payload: "Successfully Updated"
        });
        await getScans(firebase)(dispatch);
    } catch (err) {
        dispatch({
            type: actions.UPDATE_SCAN_FAIL,
            payload: "State Update Failed"
        });
    } finally {
        dispatch({
            type: actions.UPDATE_SCAN_STATE_CLEAR
        })
        dispatch({
            type: actions.CLEAR_SELECTED_SCANS_QUEUE
        })
        addToSelectedScansQueue([scanId])(dispatch);
    }
};