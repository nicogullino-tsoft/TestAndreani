import { CREDENTIALS_GET_ALL } from './types/actionTypes';
import { CREDENTIALS_GET_BY_ID } from './types/actionTypes';
import { CREDENTIALS_POST_ALL } from './types/actionTypes';
import { CREDENTIALS_PUT_ALL } from './types/actionTypes';
import { CREDENTIALS_PUT_STATUS } from './types/actionTypes';
import api from '../api';

// METODO GET
export function gettedDispatchGetCredential(data: any) {
    return {
        type: CREDENTIALS_GET_ALL,
        payload: data
    };
}

export function dispatchGetCredential() {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        // esto devuelve una promesa
        return api.get('credentials').then((response: { data: any; }) => {
            dispatch(gettedDispatchGetCredential(response.data));
            return response.data;
        });
    };
}

// METODO GET BY ID
export function gettedDispatchGetCredentialById(data: any) {
    return {
        type: CREDENTIALS_GET_BY_ID,
        payload: data
    };
}
export function dispatchGetCredentialById(id: number) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        return api.get('/credentials/' + id).then((response: { data: any; }) => {
            dispatch(gettedDispatchGetCredentialById(response.data));
            return response.data;
        });

    };
}

// METODO POST
export function gettedDispatchPostCredential(data: any) {
    return {
        type: CREDENTIALS_POST_ALL,
        payload: data
    };
}

export function dispatchPostCredential(datos: any) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.post('credentials', datos).then((response: { data: any; }) => {
            dispatch(gettedDispatchPostCredential(response.data));
            return response.data;
        });
    };
}

// METODO PUT UPDATE
export function getterDispatchPutCredential(data: any) {
    return {
        type: CREDENTIALS_PUT_ALL,
        payload: data
    };
}

export function dispatchPutCredential(id: string | number, datos: any) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/credentials/' + id, datos).then((response: { data: any; }) => {
            dispatch(getterDispatchPutCredential(response.data));
            return response.data;
        });
    };
}
// METODO PUT STATUS
export function gettedDispatchPutCredentialStatus(data: any) {
    return {
        type: CREDENTIALS_PUT_STATUS,
        payload: data
    };
}
export function dispatchPutCredentialStatus(status: any) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/credentials/status', status).then((response: { data: any; }) => {
            dispatch(gettedDispatchPutCredentialStatus(response.data));
            return response.data;
        });

    };
}