import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import Chart from './Chart'
import TransactionTable from './TransactionTable'
import DatePicker from './DatePicker'
import { useAuth } from '../../hooks/queries/useAuth'
import { useMenu } from '../../hooks/queries/useMenu'
import { useMenuActions } from '../../hooks/commands/useMenuActions'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { useDate } from '../../hooks/queries/useDate'
import { useCategoryActions } from '../../hooks/commands/useCategoryActions'
import NavBar from '../NavBar/NavBar'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core'
import './Summary.css'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    control: {
        padding: 0
    },
    content: {
        width: '100%',
        // height: '100vh',
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
    cardContainer: {
        position: 'absolute',
        top: '43%',
        left: '68.5%',
        width: '200px',
        zIndex: '-1',
        display: 'flex',
        justifyContent: 'center',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    cardContainerShift: {
        top: '39%',
        left: '72.5%',
        // width: 'calc(100% - 240px)',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hover: {
        boxShadow: 'none',
    },
    hoverContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const initialSummaryData = {
    hoverData: {
        title: '',
        value: 0,
        color: ''
    },
    selectedCategory: '',
    selectedStartDate: '',
    selectedEndDate: '',
}

export default function Summary() {

    const [ summaryData, setSummaryData ] = useState(initialSummaryData)
    const classes = useStyles()
    const { menuVisible } = useMenu()
    const { expenses } = useCalendar()
    const { date } = useDate()
    const { user } = useAuth()
    const { toggleMenuTrue, toggleMenuFalse } = useMenuActions()
    const { getUserCategories } = useCategoryActions()
    const { startDate, endDate } = date
    const { hoverData, selectedStartDate, selectedEndDate } = summaryData

    

    const toggleMenu = () => {
        menuVisible ? toggleMenuFalse() : toggleMenuTrue()
    }

    const handleMouseOver = (data, index) => {
        let mouseOverData = data[index]
        setSummaryData({
            ...summaryData,
            hoverData: mouseOverData
        })
    }

    const handleMouseOut = (data, index) => {
        let total = data.reduce((acc, curr) => acc + curr.value, 0)
        let totalData = {
            title: 'Total',
            value: total,
            color: '#86A5D9'
        }
        setSummaryData({
            ...summaryData,
            hoverData: totalData
        })
    }

    const handleChartClick = (categoryID) => {
        setSummaryData({
            ...summaryData,
            selectedCategory: categoryID
        })
    }

    

    useEffect(() => {
        let total = expenses.reduce((acc, curr) => acc + curr.amount, 0)
        let defaultData = {
            title: 'Total',
            value: total,
            color: '#86A5D9'
        }
        getUserCategories(user.id)
        setSummaryData({
            ...summaryData,
            hoverData: defaultData,
            selectedStartDate: startDate,
            selectedEndDate: endDate
        })
    }, [])

    return (
        <>
            <div className={clsx(classes.content, {[classes.contentShift] : menuVisible})}>
                <NavBar handleMenuToggle={toggleMenu}/>
                <DatePicker />
                <Chart handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} handleChartClick={handleChartClick} />
                <TransactionTable category={summaryData.selectedCategory} />
                <div className={clsx(classes.cardContainer, {[classes.cardContainerShift] : menuVisible})}>
                    <Card className={classes.hover}>
                        <CardContent className={classes.hoverContent}>
                            <Typography style={{fontWeight: 'bolder', color:hoverData.color}}>{hoverData.title}</Typography>
                            <Typography>{hoverData.value.toFixed(2)}</Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <MenuDrawer />
        </>
    )
}
