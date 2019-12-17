import React from 'react';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton }from '@material-ui/core';
import { Menu } from '@material-ui/icons'
import ButtonClass from '../../factory/Button/ButtonClass'
import { useAuth } from '../../hooks/queries/useAuth';

const useStyles = makeStyles(theme => ({
    nav: {
        height: '80px',
        backgroundColor: '#86A5D9',
        justifyContent: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    rightToolbar: {
        marginLeft: 'auto',
    },
    title: {
        fontSize: 20,
        textDecoration: 'none',
        color: 'white',
        marginRight: '80px'
    },
    navLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        marginLeft: '50px'
    },
    signupAndSignin: {
        marginLeft: '10px'
    },
    activeLinks: {
        color: 'white',
        textDecoration: 'underline white'
    }
}));

export default function NavBar({toggleSignUpAndSignIn, handleMenuToggle}) {
  const classes = useStyles();
  const { isAuthenticated } = useAuth()

  let navigation = null


  if (isAuthenticated){
      navigation = (
          <>
            <NavLink
                exact
                to='/calendar'
                className={[classes.navLinkStyle,
                            classes.signupAndSignin].join(' ')}
                activeStyle={{color: 'white', textDecoration: 'underline white'}}
            >Go to My Calendar</NavLink>
          </>
      )
  } else {
      navigation = (
          <>
            <ButtonClass onClick={toggleSignUpAndSignIn} color="inherit">Sign Up / Login</ButtonClass>
          </>
      )
  }

  return (
    <>
        <AppBar className={classes.nav} position="static">
            <Toolbar>
                { isAuthenticated && <IconButton color='inherit' onClick={() => handleMenuToggle()} edge='start'><Menu /></IconButton> }
                <NavLink 
                    className={classes.title}
                    exact
                    to='/'>
                        Calendar Expense Tracker
                </NavLink>
                <NavLink 
                    className={classes.navLinkStyle}
                    activeStyle={{color: 'white', textDecoration: 'underline white'}}
                    exact
                    to='/about'>
                        ABOUT
                </NavLink>
                <NavLink 
                    className={classes.navLinkStyle}
                    activeStyle={{color: 'white', textDecoration: 'underline white'}}
                    exact
                    to='/how-it-works'>
                        HOW IT WORKS
                </NavLink>
                <section className={classes.rightToolbar}>
                    {navigation}
                </section>
            </Toolbar>
        </AppBar>
    </>
  );
}