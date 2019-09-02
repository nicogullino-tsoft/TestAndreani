import { CREDENTIALS_GET_ALL } from '../actions/types/actionTypes';
import { CREDENTIALS_GET_BY_ID } from '../actions/types/actionTypes';
import { CREDENTIALS_POST_ALL } from '../actions/types/actionTypes';
import { CREDENTIALS_PUT_ALL } from '../actions/types/actionTypes';
import { CREDENTIALS_PUT_STATUS } from '../actions/types/actionTypes';
// import * as actions from '../actions/applicationActions';

const defaultState = {
    credential: [

    ],
};

export default function(state: any = defaultState, action: any) {

    switch (action.type) {
        case CREDENTIALS_GET_ALL:
            return { ...state, credential: action.payload };
        case CREDENTIALS_GET_BY_ID:
            return { ...state, credential: action.payload };
        case CREDENTIALS_POST_ALL:
            return { ...state, credential: action.payload };
        case CREDENTIALS_PUT_ALL:
            return { ...state, credential: action.payload };
        case CREDENTIALS_PUT_STATUS:
            return { ...state, credential: action.payload };
        default:
            return { ...state };
    }
}
