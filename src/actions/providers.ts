import { PROVIDERS_GET_ALL } from '../actions/types/actionTypes';
import { PROVIDERS_GET_BY_ID } from '../actions/types/actionTypes';
import { PROVIDERS_POST_ALL } from '../actions/types/actionTypes';
import { PROVIDERS_POST_TEST } from '../actions/types/actionTypes';
import { PROVIDERS_PUT_ALL } from '../actions/types/actionTypes';
import { PROVIDERS_PUT_STATUS } from '../actions/types/actionTypes';

import api from '../api';

// METODO GET ALL
export function gettedDispatchGetProvider(data: any) {
    return {
        type: PROVIDERS_GET_ALL,
        payload: data
    };
}
export function dispatchGetProvider() {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        // esto devuelve una promesa
        return api.get('providers').then((response: { data: any; }) => {
            dispatch(gettedDispatchGetProvider(response.data));
            return response.data;
        });
    };
}

// METODO GET BY ID
export function gettedDispatchGetProviderById(data: any) {
    return {
        type: PROVIDERS_GET_BY_ID,
        payload: data
    };
}
export function dispatchGetProviderById(id: number | null) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        return api.get('/providers/' + id).then((response: { data: any; }) => {
            dispatch(gettedDispatchGetProviderById(response.data));
            return response.data;
        });

    };
}

// METODO POST
export function gettedDispatchPostProvider(data: any) {
    return {
        type: PROVIDERS_POST_ALL,
        payload: data
    };
}

export function dispatchPostProvider(datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.post('providers', datos).then((response: { data: any; }) => {
            dispatch(gettedDispatchPostProvider(response.data));
            return response.data;
        });
    };
}

// MEDOTO TEST
export function getterDispatchPostTest(data: any) {
    return {
        type: PROVIDERS_POST_TEST,
        payload: data
    };
}

export function dispatchPostTest(data: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.post('/providers/test', data).then((response: { data: any; }) => {
            dispatch(getterDispatchPostTest(response.data));
            return response.data;
        });
    };
}

// METODO PUT UPDATE
export function getterDispatchPutProvider(data: any) {
    return {
        type: PROVIDERS_PUT_ALL,
        payload: data
    };
}

export function dispatchPutProvider(id: number, datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/providers/' + id, datos).then((response: { data: any; }) => {
            dispatch(getterDispatchPutProvider(response.data));
            return response.data;
        });
    };
}

// METODO PUT STATUS
export function gettedDispatchPutProviderStatus(data: any) {
    return {
        type: PROVIDERS_PUT_STATUS,
        payload: data
    };
}
export function dispatchPutProviderStatus(status: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/providers/status', status).then((response: { data: any; }) => {
            dispatch(gettedDispatchPutProviderStatus(response.data));
            return response.data;
        });

    };
}

// aca referenciamos al store