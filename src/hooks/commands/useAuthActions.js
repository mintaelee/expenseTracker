import { useDispatch } from 'react-redux'
import { apiRequest } from '../../store/actions/api'
import { setUser, handleLogout, handleAuthError } from '../../store/actions/auth'
import { SIGNUP_URL, SIGNIN_URL } from '../../APIEndpoints'
import { SIGN_UP_ERROR } from '../../store/actionTypes'
import setAuthToken from '../../lib/auth/setAuthToken'
import { toggleMenu } from '../../store/actions/menu'


export const signupUser = dispatch => signupData => {
    dispatch(
        apiRequest({
            method: "POST",
            url: SIGNUP_URL,
            payload: signupData,
            onSuccess: authSuccess(dispatch),
            onError: authError(dispatch)
        })
    )
}

export const signinUser = dispatch => signinData => {
    dispatch(
        apiRequest({
            method: 'POST',
            url: SIGNIN_URL,
            payload: signinData,
            onSuccess: authSuccess(dispatch),
            onError: authError(dispatch)
        })
    )
}

export const logout = dispatch =>  () => {
    localStorage.removeItem('jwtToken')
    dispatch(handleLogout(dispatch))
    dispatch(toggleMenu({menuVisible: false}))
}

export const authSuccess = dispatch => (success) => {
    try {
        let { token } = success
        setAuthToken(token)
        localStorage.setItem('jwtToken', token)
        dispatch(setUser(token))
        return Promise.resolve(token)
    } catch (error){
        dispatch(handleAuthError(error.response.data.messsage))
        return Promise.reject(error)
    }
}
export const authError = dispatch => ({ error }) => {
    dispatch(handleAuthError({ error }))
}

export function useAuthActions() {
    const dispatch = useDispatch()

    return {
        signupUser: signupUser(dispatch),
        signinUser: signinUser(dispatch),
        logout: logout(dispatch)
    }
}