import React, { useState, useEffect } from "react";
import clsx from 'clsx'
import { useDateActions } from '../../hooks/commands/useDateActions'
import { useAuth } from '../../hooks/queries/useAuth'
import { useMenu } from '../../hooks/queries/useMenu'
import { useMenuActions } from '../../hooks/commands/useMenuActions'
import { makeStyles, Link } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import Signup from '../Signup/Signup'
import Signin from '../Signin/Signin'
import NavBar from '../NavBar/NavBar'
import MenuDrawer from '../MenuDrawer/MenuDrawer'

const drawerWidth = 240

const initialState = {
    buttonClick: false,
    toggle: 'signup'
}

const useStyles = makeStyles(theme => ({
    toggle: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50
    },
    content: {
        width: '100%',
        height: '100vh',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    contentShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
}))

export default function Home() {
    const classes = useStyles()
    const { isAuthenticated } = useAuth()
    const [ toggleState, setToggleState ] = useState(initialState)
    const { toggle } = toggleState
    const { getCurrentDate } = useDateActions()
    const { menuVisible } = useMenu()
    const { toggleMenuTrue, toggleMenuFalse } = useMenuActions()

    useEffect(() => {
        getCurrentDate()
    }, [])

    const handleToggle = (event, newToggle) => {
        setToggleState({
            ...toggleState,
            toggle: newToggle
        })
    }
    
    const toggleSignUpAndSignIn = () => {
        setToggleState({
            ...toggleState,
            buttonClicked: true
        })
    }

    const toggleMenu = () => {
        menuVisible ? toggleMenuFalse() : toggleMenuTrue()
    }

    return (
        <>
            <div className={clsx(classes.content, {[classes.contentShift] : menuVisible})}>
                <NavBar toggleSignUpAndSignIn={toggleSignUpAndSignIn} handleMenuToggle={toggleMenu}/>
                { !isAuthenticated && toggleState.buttonClicked ? 
                <>
                    <ToggleButtonGroup
                        className={classes.toggle}
                        value={toggle}
                        exclusive
                        onChange={handleToggle}
                    >
                        <ToggleButton value='signup'>Signup</ToggleButton>
                        <ToggleButton value='signin'>Signin</ToggleButton>
                    </ToggleButtonGroup>
                    {toggle === 'signin' ? <Signin /> : <Signup />}
                </> : <h1>Home</h1> }
            </div>
            { isAuthenticated && <MenuDrawer /> }
        </>
    );
}
