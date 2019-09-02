/*import {
    GET_TOKEN,
    AUTH_SUCCESS,
    AUTH_FAILED,
    getAutorization,
} from '../actions/authorizationActions';*/

export default function reducer(state: any, action: any) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null,
            };

        case 'UPDATE_FIELD_AUTH':
            return {
                ...state,
                [action.key]: action.value,
            };
        case 'ASYNC_START':
            if (action.subtype === 'LOGIN') {
                return {
                    ...state,
                    inProgress: true,
                };
            }
            return state;
        default:
            return { ...state };
    }
}