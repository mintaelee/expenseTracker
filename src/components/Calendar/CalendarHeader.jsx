import React, { useState } from 'react'
import { makeStyles, Card, Grid, CardContent, IconButton, Typography } from '@material-ui/core/'
import { ArrowRight, ArrowLeft, Menu } from '@material-ui/icons/'
import { MONTHS_STRING } from '../../lib/calendarHelpers/constants'
import { useDate } from '../../hooks/queries/useDate'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { toggleCalendarView, useCalendarActions } from '../../hooks/commands/useCalendarActions'
import ButtonClass from '../../factory/Button/ButtonClass'
import { useDateActions } from '../../hooks/commands/useDateActions'

const useStyles = makeStyles(theme => ({
    calendarHeader: {
        height: '80px',
    },
    card: {
        height: '100%',
        boxShadow: 'none',
        borderRadius: '0px',
        backgroundColor: '#86A5D9',
        color: 'white'
    },
    calendarHeading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: '2em',
        paddingLeft: 25,
        marginRight: 'auto'
    },
    button: {
        borderRadius: '0%'
    }
}))


export default function CalendarHeader({ decreaseOnClick, increaseOnClick, setToCurrentDate, handleMenuToggle }){
    
    const { date } = useDate()
    const { month, year, currentDate } = date
    const { calendarView } = useCalendar()
    const { toggleCalendarView } = useCalendarActions()
    const { toggleMonth, toggleWeek } = useDateActions()

    let monthString = MONTHS_STRING[month-1]

    const toggleWeekView = () => {
        toggleCalendarView('week')
        toggleWeek(currentDate, month, year)
    }
    const toggleMonthView = () => {
        toggleCalendarView('month')
        toggleMonth(month, year)
    }

    const classes = useStyles()

    return(
        <Grid>
            <Grid className={classes.calendarHeader} item>
                <Card className={classes.card}>
                    <CardContent className={classes.calendarHeading}>
                        <IconButton color='inherit' onClick={() => handleMenuToggle()} edge='start'><Menu /></IconButton>
                        <Typography className={classes.title}>{`${monthString} ${year}`}</Typography>
                        <ButtonClass
                            color='primary'
                            onClick={toggleWeekView}
                            disabled={calendarView === 'month' ? false : true}
                        >
                            Week
                        </ButtonClass>
                        <ButtonClass
                            color='primary'
                            onClick={toggleMonthView}
                            disabled={calendarView === 'month' ? true : false}
                        >
                            Month   
                        </ButtonClass>
                        <IconButton className={classes.button} onClick={() => decreaseOnClick()}>{<ArrowLeft />}</IconButton>
                        <IconButton className={classes.button} onClick={() => setToCurrentDate()}>Today</IconButton>
                        <IconButton className={classes.button} onClick={() => increaseOnClick()}>{<ArrowRight />}</IconButton>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
