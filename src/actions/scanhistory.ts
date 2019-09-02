import { SCAN_HISTORY_GET_ALL } from '../actions/types/actionTypes';
import { SCAN_HISTORY_GET_BY_ID } from '../actions/types/actionTypes';

import api from '../api';

// METODO GET ALL
export function gettedDispatchGetScanHistory(data: any) {
    return {
        type: SCAN_HISTORY_GET_ALL,
        payload: data
    };
}
export function dispatchGetScanHistory() {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        
        return {
        };

        // return api.get('/roles').then((response: { data: any; }) => {
        //     dispatch(gettedDispatchGetScanHistory(response.data));
        //     return response.data;
        // });
    };
}

// METODO GET BY ID
export function gettedDispatchGetScanHistoryById(data: any) {
    return {
        type: SCAN_HISTORY_GET_BY_ID,
        payload: data
    };
}
export function dispatchGetScanHistoryById(id: number | null) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        return api.get('/roles/' + id).then((response: { data: any; }) => {
            dispatch(gettedDispatchGetScanHistoryById(response.data));
            return response.data;
        });

    };
}