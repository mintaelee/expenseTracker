import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, Typography, Link } from '@material-ui/core'
import { Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ChevronLeft, ChevronRight, AccountCircle, DateRange, PieChart, Edit, FileCopy, ExitToApp } from '@material-ui/icons'
import { useAuth } from '../../hooks/queries/useAuth'
import { useAuthActions } from '../../hooks/commands/useAuthActions'
import { useMenu } from '../../hooks/queries/useMenu';
import { useMenuActions } from '../../hooks/commands/useMenuActions';

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      paddingLeft: 25,
      ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
    drawerLast: {
      width: 240,
      position: 'absolute',
      bottom: 0
    }
  }));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function MenuDrawer() {
    const classes = useStyles()
    const theme = useTheme()

    const { user } = useAuth()
    const { logout } = useAuthActions()
    const { menuVisible } = useMenu()
    const { toggleMenuFalse } = useMenuActions()

    const handleRedirect = (event) => {
      console.log(event)
    }

    

    return (
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={menuVisible}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.drawerHeader}>
            <Typography>Welcome {user.username}</Typography>
            <IconButton onClick={toggleMenuFalse}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          <div className={classes.drawerContent}>
            <div className={classes.drawerNav}>
              <Divider />
              <List>
                <ListItemLink href='/calendar' key={'calendar'}>
                  <ListItemIcon><DateRange/></ListItemIcon>
                  <ListItemText primary={'Calendar'} />
                </ListItemLink>
                <ListItemLink href='/profile' key={'profile'}>
                  <ListItemIcon><AccountCircle/></ListItemIcon>
                  <ListItemText primary={'Profile'} />
                </ListItemLink>
                <ListItemLink href='/summary' key={'summary'}>
                  <ListItemIcon><PieChart/></ListItemIcon>
                  <ListItemText primary={'Summary'} />
                </ListItemLink>
                <ListItemLink href='/upload-file' key={'upload'}>
                  <ListItemIcon><FileCopy/></ListItemIcon>
                  <ListItemText primary={'Upload Transactions'} />
                </ListItemLink>
                <ListItemLink href='/category' key={'category'}>
                  <ListItemIcon><Edit/></ListItemIcon>
                  <ListItemText primary={'Add/Edit Category'} />
                </ListItemLink>
              </List>
            </div>
            <div className={classes.drawerLast}>
              <Divider />
              <List>
                  <ListItemLink onClick={logout} href='/' key={'signout'}>
                    <ListItemIcon><ExitToApp/></ListItemIcon>
                    <ListItemText primary={'Signout'} />
                  </ListItemLink>
              </List>
            </div>
              
        </div>
            
        </Drawer>
    )
}
