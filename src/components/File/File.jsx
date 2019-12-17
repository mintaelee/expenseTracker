import React, { useEffect } from 'react'
import clsx from 'clsx'
import UploadFile from './UploadFile'
import { useMenu } from '../../hooks/queries/useMenu'
import { useMenuActions } from '../../hooks/commands/useMenuActions'
import { useCategoryActions } from '../../hooks/commands/useCategoryActions'
import NavBar from '../NavBar/NavBar'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import { makeStyles } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    control: {
        padding: 0
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


export default function File() {

    const classes = useStyles()
    const { menuVisible } = useMenu()
    const { toggleMenuTrue, toggleMenuFalse } = useMenuActions()
    const { getUserCategories } = useCategoryActions()

    const toggleMenu = () => {
        menuVisible ? toggleMenuFalse() : toggleMenuTrue()
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <div className={clsx(classes.content, {[classes.contentShift] : menuVisible})}>
                <NavBar handleMenuToggle={toggleMenu}/>
                <UploadFile />
            </div>
            <MenuDrawer />
        </>
    )
}
