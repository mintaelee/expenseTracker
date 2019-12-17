import { API_REQUEST } from '../actionTypes'

export const apiRequest = ({
    method = 'GET',
    url,
    payload = {},
    onSuccess,
    onError
}) => ({
    type: API_REQUEST,
    payload,
    meta: { method, url, onSuccess, onError }
})