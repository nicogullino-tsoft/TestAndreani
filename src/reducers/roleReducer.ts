import { ROLES_GET_ALL } from '../actions/types/actionTypes';
import { ROLES_GET_BY_ID } from '../actions/types/actionTypes';
import { ROLES_POST_ALL } from '../actions/types/actionTypes';
import { ROLES_PUT_ALL } from '../actions/types/actionTypes';
import { ROLES_PUT_STATUS } from '../actions/types/actionTypes';

const defaultState = {
    role: [

    ],
};

export default function(state: any = defaultState, action: { type: string; payload: any; }) {
    switch (action.type) {
        case ROLES_GET_ALL:
            return { ...state, role: action.payload };
        case ROLES_GET_BY_ID:
            return { ...state, role: action.payload };
        case ROLES_POST_ALL:
            return { ...state, role: action.payload };
        case ROLES_PUT_ALL:
            return { ...state, role: action.payload };
        case ROLES_PUT_STATUS:
            return { ...state, role: action.payload };
        default:
            return { ...state };

    }
}