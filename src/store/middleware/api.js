import Axios from 'axios'
import { toggleLoader } from '../actions/ui'
import { API_URL } from '../../APIEndpoints'

const API_REQUEST = 'API_REQUEST'

const dispatchToggleLoader = (dispatch, bool, { method, url }) => 
    dispatch(toggleLoader({ loaderVisible: bool, trigger: `${method} ${url}`}))

const makeRequest = (
    dispatch,
    { payload },
    { method, url, onSuccess, onError }
) => {
    switch(method){
        case('POST'):
            dispatchToggleLoader(dispatch, true, { method, url })
            return Axios
                .post(`${API_URL}${url}`, payload)
                .then((success) => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onSuccess(success.data)
                })
                .catch(error => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onError(error)
                })
        case('GET'):
            dispatchToggleLoader(dispatch, true, { method, url })
            return Axios
                .get(`${API_URL}${url}`, {
                    params: payload
                })
                .then((success) => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onSuccess(success.data)
                })
                .catch(error => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onError(error)
                })
        case('DELETE'):
            dispatchToggleLoader(dispatch, true, { method, url })
            return Axios
                .delete(`${API_URL}${url}`, {
                    params: payload
                })
                .then((success) => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onSuccess(success.data)
                })
                .catch(error => {
                    dispatchToggleLoader(dispatch, false, { method, url })
                    onError(error)
                })    
        default:
            return payload
    }
}

export const apiMiddleware = ({ dispatch }) => next => action => {
    if (action.type === API_REQUEST){
        return makeRequest(dispatch, action, action.meta)
    }
    next(action)
}