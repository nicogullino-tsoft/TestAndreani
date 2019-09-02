import { PERMISSIONS_GET_ALL } from './types/actionTypes';
import api from '../api';

// METODO GET
export function gettedDispatchGetPermissions(data: any) {
    return {
        type: PERMISSIONS_GET_ALL,
        payload: data
    };
}

export function dispatchGetPermissions() {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        // esto devuelve una promesa
        return api.get('/permissions/permissionList').then((response: { data: any; }) => {
            dispatch(gettedDispatchGetPermissions(response.data));
            return response.data;
        });
    };
}