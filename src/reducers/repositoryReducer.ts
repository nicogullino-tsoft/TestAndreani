import { REPOSITORY_GET_ALL } from '../actions/types/actionTypes';
import { REPOSITORY_GET_BY_ID } from '../actions/types/actionTypes';
import { REPOSITORY_POST_ALL } from '../actions/types/actionTypes';
import { REPOSITORY_PUT_ALL } from '../actions/types/actionTypes';
import { REPOSITORY_PUT_STATUS } from '../actions/types/actionTypes';
import { REPOSITORY_GET_COUNT } from '../actions/types/actionTypes';

const defaultState = {
    repository: [

    ],
};

export default function(state: any = defaultState, action: { type: string; payload: any; }) {
    switch (action.type) {
        case REPOSITORY_GET_COUNT:
            return { ...state, repository: action.payload };
        case REPOSITORY_GET_ALL:
            return { ...state, repository: action.payload };
        case REPOSITORY_GET_BY_ID:
            return { ...state, repository: action.payload };
        case REPOSITORY_POST_ALL:
            return { ...state, repository: action.payload };
        case REPOSITORY_PUT_ALL:
            return { ...state, repository: action.payload };
        case REPOSITORY_PUT_STATUS:
            return { ...state, repository: action.payload };
        default:
            return { ...state };

    }
}
