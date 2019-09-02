import { REPOSITORY_GET_ALL } from '../actions/types/actionTypes';
import { REPOSITORY_GET_BY_ID } from '../actions/types/actionTypes';
import { REPOSITORY_POST_ALL } from '../actions/types/actionTypes';
import { REPOSITORY_PUT_ALL } from '../actions/types/actionTypes';
import { REPOSITORY_PUT_STATUS } from '../actions/types/actionTypes';
import { REPOSITORY_GET_COUNT } from '../actions/types/actionTypes';

import api from '../api';

// METODO GET COUNT
export function gettedDispatchGetCountRepository(data: any) {
    return {
        type: REPOSITORY_GET_COUNT,
        payload: data
    };
}
export function dispatchGetCountRepository() {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.get('/repositories/count').then((response: { data: any; }) => {
            dispatch(gettedDispatchGetCountRepository(response.data));
            return response.data;
        });
    };
}

// METODO GET ALL
export function gettedDispatchGetRepository(data: any) {
    return {
        type: REPOSITORY_GET_ALL,
        payload: data
    };
}
export function dispatchGetRepository(page?: number, size?: number) {
    if (page !== undefined && size !== undefined) {
        return (dispatch: (arg0: { type: any; payload: any; }) => void) => {
            return api.get('/repositories?page=' + page + '&size=' + size).then((response: { data: any; }) => {
                dispatch(gettedDispatchGetRepository(response.data));
                return response.data;
            });
        };
    } else {
        return (dispatch: (arg0: { type: any; payload: any; }) => void) => {
            return api.get('/repositories').then((response: { data: any; }) => {
                dispatch(gettedDispatchGetRepository(response.data));
                return response.data;
            });
        };
    }
}

// METODO GET BY ID
export function gettedDispatchGetRepositoryById(data: any) {
    return {
        type: REPOSITORY_GET_BY_ID,
        payload: data
    };
}
export function dispatchGetRepositoryById(id: number | null) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        return api.get('/repositories/' + id).then((response: { data: any; }) => {
            dispatch(gettedDispatchGetRepositoryById(response.data));
            return response.data;
        });

    };
}

// METODO POST
export function gettedDispatchPostRepository(data: any) {
    return {
        type: REPOSITORY_POST_ALL,
        payload: data
    };
}

export function dispatchPostRepository(datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.post('repositories', datos).then((response: { data: any; }) => {
            dispatch(gettedDispatchPostRepository(response.data));
            return response.data;
        });
    };
}

// METODO PUT UPDATE
export function getterDispatchPutRepository(data: any) {
    return {
        type: REPOSITORY_PUT_ALL,
        payload: data
    };
}

export function dispatchPutRepository(id: number | null, datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/repositories/' + id, datos).then((response: { data: any; }) => {
            dispatch(getterDispatchPutRepository(response.data));
            return response.data;
        });
    };
}

// METODO PUT STATUS
export function gettedDispatchPutRepositoryStatus(data: any) {
    return {
        type: REPOSITORY_PUT_STATUS,
        payload: data
    };
}
export function dispatchPutRepositoryStatus(status: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/repositories/status', status).then((response: { data: any; }) => {
            dispatch(gettedDispatchPutRepositoryStatus(response.data));
            return response.data;
        });

    };
}
