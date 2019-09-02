import { USERS_GET_ALL } from '../actions/types/actionTypes';
import { USERS_GET_BY_ID } from '../actions/types/actionTypes';
import { USERS_POST_ALL } from '../actions/types/actionTypes';
import { USERS_PUT_ALL } from '../actions/types/actionTypes';
import { USERS_PUT_STATUS } from '../actions/types/actionTypes';
import { USERS_PUT_FORGOT_PASSWORD } from '../actions/types/actionTypes';
import { USERS_GET_COUNT_USER } from '../actions/types/actionTypes';

import api from '../api';

// METODO GET ALL
export function gettedDispatchGetUsers(data: any) {
    return {
        type: USERS_GET_ALL,
        payload: data
    };
}
export function dispatchGetUsers(page?: number, size?: number) {
    if (page !== undefined && size !== undefined) {
        return (dispatch: (arg0: { type: any; payload: any; }) => void) => {
            return api.get('/users?page=' + page + '&size=' + size).then((response: { data: any; }) => {
                dispatch(gettedDispatchGetUsers(response.data));
                return response.data;
            });
        };
    } else {
        return (dispatch: (arg0: { type: any; payload: any; }) => void) => {
            return api.get('/users').then((response: { data: any; }) => {
                dispatch(gettedDispatchGetUsers(response.data));
                return response.data;
            });
        };
    }
}

// METODO GET BY ID
export function gettedDispatchGetUserById(data: any) {
    return {
        type: USERS_GET_BY_ID,
        payload: data
    };
}
export function dispatchGetUserById(id: number | null) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        return api.get('/users/' + id).then((response: { data: any; }) => {
            dispatch(gettedDispatchGetUserById(response.data));
            return response.data;
        });

    };
}

// METODO POST
export function gettedDispatchPostUser(data: any) {
    return {
        type: USERS_POST_ALL,
        payload: data
    };
}

export function dispatchPostUser(datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.post('users', datos).then((response: { data: any; }) => {
            dispatch(gettedDispatchPostUser(response.data));
            return response.data;
        });
    };
}

// METODO PUT UPDATE
export function getterDispatchPutUser(data: any) {
    return {
        type: USERS_PUT_ALL,
        payload: data
    };
}

export function dispatchPutUser(id: number, datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/users/' + id, datos).then((response: { data: any; }) => {
            dispatch(getterDispatchPutUser(response.data));
            return response.data;
        });
    };
}

// METODO PUT STATUS
export function gettedDispatchPutUserStatus(data: any) {
    return {
        type: USERS_PUT_STATUS,
        payload: data
    };
}

export function dispatchPutUserStatus(status: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/users/status', status).then((response: { data: any; }) => {
            dispatch(gettedDispatchPutUserStatus(response.data));
            return response.data;
        });
    };
}

// METODO PUT FORGOT_PASSWORD
export function gettedDispatchPutForgotPassword(data: any) {
    return {
        type: USERS_PUT_FORGOT_PASSWORD,
        payload: data
    };
}

export function dispatchPutForgotPassword(password: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/users/password', password).then((response: { data: any; }) => {
            dispatch(gettedDispatchPutForgotPassword(response.data));
            return response.data;
        });
    };
}

// METODO GET COUNT
export function gettedDispatchGetCountUsers(data: any) {
    return {
        type: USERS_GET_COUNT_USER,
        payload: data
    };
}
export function dispatchGetCountUsers() {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.get('/users/count').then((response: { data: any; }) => {
            dispatch(gettedDispatchGetCountUsers(response.data));
            return response.data;
        });
    };
}