import { SET_USER, LOGOUT_USER } from '../actionTypes'

export const setUser = (token) => ({
    type: SET_USER,
    payload: token
})

export const handleLogout = () => ({
    type: LOGOUT_USER
})

export const handleAuthError = error => {
    console.log(error)
}
