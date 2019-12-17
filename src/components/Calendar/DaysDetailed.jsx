import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Grid, makeStyles } from '@material-ui/core'
import DayDetailed from './DayDetailed'
import SummaryDetailed from './SummaryDetailed'
import { weekContentArray } from '../../lib/calendarHelpers/calendarConfig'
import { useDate } from '../../hooks/queries/useDate'

const useStyles = makeStyles(theme => ({
    daysContainer: {
        height: 'calc(100% - 130px)'
    },
    calendarBox: {
        width: '10%',
        borderRadius: 0,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    categoryBox: {
        width: '20%'
    }
}))

export default function Days() {

    const { date } = useDate()
    const { weekStart, weekEnd, month, year } = date

    const classes = useStyles()

    let contents = weekContentArray(weekStart, weekEnd, month, year)

    useEffect(() => {
        contents = weekContentArray(weekStart, weekEnd, month, year)
    }, [date])

    return (
        <Grid className={classes.daysContainer} container>
            {contents.map((data) => (
                <Grid key={data.count} className={clsx(classes.calendarBox, {[classes.categoryBox] : data.contentType === 'Category'})} item>
                    {data.contentType === 'Value' ? <DayDetailed data={data}/> : <SummaryDetailed data={data} />}
                </Grid>
            ))}
        </Grid>
    )
}
