import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Grid, makeStyles, useTheme } from '@material-ui/core'
import MenuDrawer from '../MenuDrawer/MenuDrawer'
import CalendarHeader from './CalendarHeader'
import DaysHeader from './DaysHeader'
import DaysHeaderDetailed from './DaysHeaderDetailed'
import Days from './Days'
import DaysDetailed from './DaysDetailed'
import EventModal from '../Modal/EventModal'
import { useDate } from '../../hooks/queries/useDate'
import { useDateActions } from '../../hooks/commands/useDateActions'
import { useAuth } from '../../hooks/queries/useAuth'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { useCalendarActions } from '../../hooks/commands/useCalendarActions'
import { useMenu } from '../../hooks/queries/useMenu'
import { useMenuActions } from '../../hooks/commands/useMenuActions'
import { useCategoryActions } from '../../hooks/commands/useCategoryActions'

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

export default function Calendar() {

    const classes = useStyles()

    const { date } = useDate()
    const { user } = useAuth()
    const { menuVisible } = useMenu()
    const { toggleMenuTrue, toggleMenuFalse } = useMenuActions()
    const { decreaseMonthByOne, increaseMonthByOne, decreaseWeekByOne, increaseWeekByOne, getCurrentDate } = useDateActions()
    const { calendarView } = useCalendar()
    const { getExpenses } = useCalendarActions()
    const { getUserCategories } = useCategoryActions()

    const handleDecrease = () => {
        if (calendarView === 'month'){
            let month = date.month
            let year = date.year
            decreaseMonthByOne({month, year})
        } else {
            let { weekStart, startDate, endDate } = date
            decreaseWeekByOne(weekStart, startDate, endDate)
        }
    }
    const handleIncrease = () => {
        if (calendarView === 'month'){
            let month = date.month
            let year = date.year
            increaseMonthByOne({month, year})
        } else {
            let { weekStart, startDate, endDate } = date
            increaseWeekByOne(weekStart, startDate, endDate)
        }
    }

    const toggleMenu = () => {
        menuVisible ? toggleMenuFalse() : toggleMenuTrue()
    }

    useEffect(() => {
        getCurrentDate()
        getUserCategories(user.id)
    }, [])

    useEffect(() => {
        let calendarData = {
            id: user.id,
            month: date.month,
            year: date.year,
            startDate: date.startDate,
            endDate: date.endDate
        }
        getExpenses(calendarData)
    }, [date])

    return (
        <>   
            <Grid position='fixed' className={clsx(classes.content, {[classes.contentShift] : menuVisible})}>
                <CalendarHeader 
                    decreaseOnClick={handleDecrease}
                    increaseOnClick={handleIncrease}
                    setToCurrentDate={getCurrentDate}
                    handleMenuToggle={toggleMenu}
                />
                {calendarView === 'month' ? <DaysHeader /> : <DaysHeaderDetailed />}
                {calendarView === 'month' ? <Days /> : <DaysDetailed />}
            </Grid>
            <MenuDrawer />
            <EventModal />
        </>
            
    )
}