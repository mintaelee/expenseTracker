import jwtDecode from 'jwt-decode'

const stateHelperFunc = (oldState, newState) => {
    return {
        ...oldState,
        ...newState
    }
}

export const jwtDecodeTokenAndSetUser = (oldState, token) => {
    let decoded = jwtDecode(token)

    return stateHelperFunc(oldState, {
        isAuthenticated: true,
        user: {
            email: decoded.email,
            username: decoded.username,
            id: decoded.id
        }
    })
}