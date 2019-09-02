import { PROJECTS_GET_ALL } from '../actions/types/actionTypes';
import { PROJECTS_GET_COUNT_PROJECT } from '../actions/types/actionTypes';
import { PROJECTS_GET_BY_ID } from '../actions/types/actionTypes';
import { PROJECTS_POST_ALL } from '../actions/types/actionTypes';
import { PROJECTS_PUT_ALL } from '../actions/types/actionTypes';
import { PROJECTS_PUT_STATUS } from '../actions/types/actionTypes';

import api from '../api';

// METODO GET COUNT
export function gettedDispatchGetCountProject(data: any) {
    return {
        type: PROJECTS_GET_COUNT_PROJECT,
        payload: data
    };
}
export function dispatchGetCountProject() {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.get('/projects/count').then((response: { data: any; }) => {
            dispatch(gettedDispatchGetCountProject(response.data));
            return response.data;
        });
    };
}

// METODO GET ALL PAGINADO
export function gettedDispatchGetProject(data: any) {
    return {
        type: PROJECTS_GET_ALL,
        payload: data
    };
}
export function dispatchGetProject(page?: number, size?: number) {
    if (page !== undefined && size !== undefined) {
        return (dispatch: (arg0: { type: any; payload: any; }) => void) => {
            return api.get('/projects?page=' + page + '&size=' + size).then((response: { data: any; }) => {
                dispatch(gettedDispatchGetProject(response.data));
                return response.data;
            });
        };
    } else {
        return (dispatch: (arg0: { type: any; payload: any; }) => void) => {
            return api.get('/projects').then((response: { data: any; }) => {
                dispatch(gettedDispatchGetProject(response.data));
                return response.data;
            });
        };
    }

}

// METODO GET BY ID
export function gettedDispatchGetProjectById(data: any) {
    return {
        type: PROJECTS_GET_BY_ID,
        payload: data
    };
}
export function dispatchGetProjectById(id: number | null) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {

        return api.get('/projects/' + id).then((response: { data: any; }) => {
            dispatch(gettedDispatchGetProjectById(response.data));
            return response.data;
        });

    };
}

// METODO POST
export function gettedDispatchPostProject(data: any) {
    return {
        type: PROJECTS_POST_ALL,
        payload: data
    };
}

export function dispatchPostProject(datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.post('projects', datos).then((response: { data: any; }) => {
            dispatch(gettedDispatchPostProject(response.data));
            return response.data;
        });
    };
}

// METODO PUT UPDATE
export function getterDispatchPutProject(data: any) {
    return {
        type: PROJECTS_PUT_ALL,
        payload: data
    };
}

export function dispatchPutProject(id: number, datos: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/projects/' + id, datos).then((response: { data: any; }) => {
            dispatch(getterDispatchPutProject(response.data));
            return response.data;
        });
    };
}

// METODO PUT STATUS
export function gettedDispatchPutProjectStatus(data: any) {
    return {
        type: PROJECTS_PUT_STATUS,
        payload: data
    };
}
export function dispatchPutProjectStatus(status: object) {
    return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        return api.put('/projects/status', status).then((response: { data: any; }) => {
            dispatch(gettedDispatchPutProjectStatus(response.data));
            return response.data;
        });

    };
}