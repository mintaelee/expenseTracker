import React from 'react'
import clsx from 'clsx'
import { Grid, Card, makeStyles, Typography } from '@material-ui/core'
import { useDate } from '../../hooks/queries/useDate'
import { DAYS_STRING } from '../../lib/calendarHelpers/constants'
import { checkDate } from '../../lib/calendarHelpers/formatDate'

const useStyles = makeStyles(theme => ({
    daysHeaderBox: {
        height: '50px',
        width: '10%',
    },
    categoryHeaderBox: {
        width: '20%'
    },
    card:{
        height: '100%',
        width: '100%',
        boxShadow: 'none',
        borderRadius: '0px'
    },
    dayHeader: {
        fontSize: 16,
        padding: 12,
        height: '100%',
        textAlign: 'center',
    },
    summaryHeader: {
        backgroundColor: '#e4ebf6',
        fontWeight: 'bolder',
    },
    day: {
        padding: 5,
        paddingLeft: 10,
        height: '20px',
        backgroundColor: 'none',
    },
    today: {
        backgroundColor: '#5F4BB6',
        padding: 5,
        width: '20px',
        borderRadius: '50%',
        textAlign: 'center',
        color: 'white',
    }
}))

const createDaysHeader = (weekStart) => {

    let headerContent = []

    let current = new Date(weekStart)
    let month = current.getMonth()
    let year = current.getFullYear()
    let date = current.getDate()

    for (let i = 0; i < DAYS_STRING.length+1; i++){        
        if (i===8) headerContent.push({content: 'Total', number: '', current: false})
        else if (i === 0) headerContent.push({content: 'Category', number: '', current: false})
        else {
            let newDate = new Date(year, month, date)
            let current = checkDate(newDate)
            let d = newDate.getDate()
            headerContent.push({content: `${DAYS_STRING[i-1].substring(0,3)}`, number: d, current})
            date += 1
        }
    }
    
    return headerContent
}

export default function DaysHeader() {
    const { date } = useDate()

    const contents = createDaysHeader(date.weekStart)
    const classes = useStyles()

    return (
        <Grid container>
            {contents.map((value) => (
                <Grid key={value.content} className={clsx(classes.daysHeaderBox, {[classes.categoryHeaderBox] : value.content === 'Category'})} item>
                    <Card className={classes.card}>
                        <Typography className={clsx(classes.dayHeader, {[classes.summaryHeader] : value.content === 'Total' || value.content === 'Category'})}>
                            <span>{`${value.content} `}</span>
                            {value.number !== '' && <span className={clsx(classes.day, value.current && classes.today)}>{value.number}</span>}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>    
    )
}
