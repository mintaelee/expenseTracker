import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/queries/useAuth'
import PropTypes from 'prop-types';


function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated } = useAuth()

    return (
        <Route 
            {...rest}
            render= { props => 
                isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/' />
                )
            }
        />
    )
}

export default withRouter(PrivateRoute)
