import { PROJECTS_GET_COUNT_PROJECT } from '../actions/types/actionTypes';
import { PROJECTS_GET_ALL } from '../actions/types/actionTypes';
import { PROJECTS_GET_BY_ID } from '../actions/types/actionTypes';
import { PROJECTS_POST_ALL } from '../actions/types/actionTypes';
import { PROJECTS_PUT_ALL } from '../actions/types/actionTypes';
import { PROJECTS_PUT_STATUS } from '../actions/types/actionTypes';

const defaultState = {
    project: [

    ],
};

export default function(state: any = defaultState, action: { type: string; payload: any; }) {
    switch (action.type) {
        case PROJECTS_GET_COUNT_PROJECT:
            return { ...state, project: action.payload };
        case PROJECTS_GET_ALL:
            return { ...state, project: action.payload };
        case PROJECTS_GET_BY_ID:
            return { ...state, project: action.payload };
        case PROJECTS_POST_ALL:
            return { ...state, project: action.payload };
        case PROJECTS_PUT_ALL:
            return { ...state, project: action.payload };
        case PROJECTS_PUT_STATUS:
            return { ...state, project: action.payload };
        default:
            return { ...state };

    }
}