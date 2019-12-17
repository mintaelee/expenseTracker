import React, { useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Day from './Day'
import Summary from './Summary'
import { contentArray } from '../../lib/calendarHelpers/calendarConfig'
import { useDate } from '../../hooks/queries/useDate'

const useStyles = makeStyles(theme => ({
    daysContainer: {
        height: 'calc(100% - 130px)'
    },
    calendarBox: {
        width: 'calc(100%/8)',
        borderRadius: 0,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }
}))

export default function Days() {

    const { date } = useDate()
    const { startDate, endDate, month, year } = date

    const classes = useStyles()

    let contents = contentArray(startDate, endDate, month, year)

    useEffect(() => {
        contents = contentArray(startDate, endDate, month, year)
    }, [date])

    return (
        <Grid className={classes.daysContainer} container>
            {contents.map((data) => (
                <Grid key={data.count} className={classes.calendarBox} item>
                    {data.content === 'Summary' ? <Summary data={data} /> : <Day data={data}/>}
                </Grid>
            ))}
        </Grid>
    )
}
