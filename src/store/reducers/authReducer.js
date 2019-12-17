import { SET_USER, LOGOUT_USER } from '../actionTypes'
import { jwtDecodeTokenAndSetUser } from './authReducerHelper'

const initialState = {
    isAuthenticated: false,
    user: null
}

export default function authReducer(authState = initialState, {payload, type}) {
    switch(type){
        case SET_USER:
            return jwtDecodeTokenAndSetUser(authState, payload)
        case LOGOUT_USER:
            return {
                isAuthenticated: false,
                user: null
            }
        default:
            return authState
    }
}