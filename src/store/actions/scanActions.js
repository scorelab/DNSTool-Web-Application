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

