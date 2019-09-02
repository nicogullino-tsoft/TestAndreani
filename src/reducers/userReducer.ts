import { USERS_GET_ALL } from '../actions/types/actionTypes';
import { USERS_GET_BY_ID } from '../actions/types/actionTypes';
import { USERS_POST_ALL } from '../actions/types/actionTypes';
import { USERS_PUT_ALL } from '../actions/types/actionTypes';
import { USERS_PUT_STATUS } from '../actions/types/actionTypes';

const defaultState = {
    user: [

    ],
};

export default function(state: any = defaultState, action: { type: string; payload: any; }) {
    switch (action.type) {
        case USERS_GET_ALL:
            return { ...state, user: action.payload };
        case USERS_GET_BY_ID:
            return { ...state, user: action.payload };
        case USERS_POST_ALL:
            return { ...state, user: action.payload };
        case USERS_PUT_ALL:
            return { ...state, user: action.payload };
        case USERS_PUT_STATUS:
            return { ...state, user: action.payload };
        default:
            return { ...state };

    }
}
