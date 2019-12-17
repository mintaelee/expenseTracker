import jwtDecode from 'jwt-decode'
import { setUser } from '../../store/actions/auth'
import setAuthToken from './setAuthToken'

const checkTokenAuth = (store) => {
    let jwtToken = localStorage.getItem('jwtToken')
    let decoded

    if (jwtToken){
        setAuthToken(jwtToken)
        decoded = jwtDecode(jwtToken)
        store.dispatch(setUser(jwtToken))
        const currentTime = Date.now() / 1000

        if (decoded.exp < currentTime){
            console.log('handlelogout')
            // store.dispatch(handleLogout())
            // window.location.href = '/sign-in'
            //logout
            //redirect
        }

    }
    return
}

export default checkTokenAuth
