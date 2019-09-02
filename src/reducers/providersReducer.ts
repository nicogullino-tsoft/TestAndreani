import { PROVIDERS_GET_ALL } from '../actions/types/actionTypes';
import { PROVIDERS_GET_BY_ID } from '../actions/types/actionTypes';
import { PROVIDERS_POST_ALL } from '../actions/types/actionTypes';
import { PROVIDERS_POST_TEST } from '../actions/types/actionTypes';
import { PROVIDERS_PUT_ALL } from '../actions/types/actionTypes';
import { PROVIDERS_PUT_STATUS } from '../actions/types/actionTypes';

const defaultState = {
    provider: [

    ],
};

export default function(state: any = defaultState, action: { type: string; payload: any; }) {
    switch (action.type) {
        case PROVIDERS_GET_ALL:
            return { ...state, provider: action.payload };
        case PROVIDERS_GET_BY_ID:
            return { ...state, provider: action.payload };
        case PROVIDERS_POST_ALL:
            return { ...state, provider: action.payload };
        case PROVIDERS_POST_TEST:
            return { ...state, provider: action.payload };
        case PROVIDERS_PUT_ALL:
            return { ...state, provider: action.payload };
        case PROVIDERS_PUT_STATUS:
            return { ...state, provider: action.payload };
        default:
            return { ...state };

    }
}