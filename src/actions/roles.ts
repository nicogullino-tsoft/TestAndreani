import { ROLES_GET_ALL } from '../actions/types/actionTypes';
import { ROLES_GET_BY_ID } from '../actions/types/actionTypes';
import { ROLES_POST_ALL } from '../actions/types/actionTypes';
import { ROLES_PUT_ALL } from '../actions/types/actionTypes';
import { ROLES_PUT_STATUS } from '../actions/types/actionTypes';

import api from '../api';

// METODO GET ALL
export function gettedDispatchGetRoles(data: any) {
    return {
        type: ROLES_GET_ALL,
        payload: data
    };
}
export function dispatchGetRoles() {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.get('/roles').then((response: { data: any; }) => {
            dispatch(gettedDispatchGetRoles(response.data));
            return response.data;
        });
    };
}

// METODO GET BY ID
export function gettedDispatchGetRoleById(data: any) {
    return {
        type: ROLES_GET_BY_ID,
        payload: data
    };
}
export function dispatchGetRoleById(id: number | null) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        return api.get('/roles/' + id).then((response: { data: any; }) => {
            dispatch(gettedDispatchGetRoleById(response.data));
            return response.data;
        });

    };
}

// METODO POST
export function gettedDispatchPostRole(data: any) {
    return {
        type: ROLES_POST_ALL,
        payload: data
    };
}

export function dispatchPostRole(datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.post('/roles', datos).then((response: { data: any; }) => {
            dispatch(gettedDispatchPostRole(response.data));
            return response.data;
        });
    };
}

// METODO PUT UPDATE
export function getterDispatchPutRole(data: any) {
    return {
        type: ROLES_PUT_ALL,
        payload: data
    };
}

export function dispatchPutRole(id: number, datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/roles/' + id, datos).then((response: { data: any; }) => {
            dispatch(getterDispatchPutRole(response.data));
            return response.data;
        });
    };
}

// METODO PUT STATUS
export function gettedDispatchPutRoleStatus(data: any) {
    return {
        type: ROLES_PUT_STATUS,
        payload: data
    };
}
export function dispatchPutRoleStatus(status: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/roles/status', status).then((response: { data: any; }) => {
            dispatch(gettedDispatchPutRoleStatus(response.data));
            return response.data;
        });
    };
}