/*import * as types from './types/actionTypes'
import axios from 'axios'

export const requestData = () => ({ type: types.REQUEST_DATA})
export const receiveData = (json) => { return { type: types.RECEIVE_DATA, data: json }};
export const receiveError = (json) => { return {typw: types.RECEIVE_ERROR, data: json}};

export function fetchData(url){
    return function(dispatch) {
        dispatch(requestData());
        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
        .then(function(response){
            dispatch(receiveData(response.data));
        })
        .catch(function(response){
            dispatch(receiveError(response.data));
            
        })
    }

};*/