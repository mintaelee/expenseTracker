import React from 'react'
import clsx from 'clsx'
import { Grid, Card, makeStyles, Typography } from '@material-ui/core'
import { DAYS_STRING } from '../../lib/calendarHelpers/constants'

const useStyles = makeStyles(theme => ({
    daysHeaderBox: {
        height: '50px',
        width: 'calc(100%/8)',
    },
    summaryHeader: {
        backgroundColor: '#e4ebf6',
        fontWeight: 'bolder',
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
        textAlign: 'right',
    }
}))

const createDaysHeader = () => {
    let headerContent = []

    for (let i = 0; i < DAYS_STRING.length; i++){
        if (i===7) headerContent.push(DAYS_STRING[i])
        else headerContent.push(DAYS_STRING[i].substring(0,3))
    }
    
    return headerContent
}

export default function DaysHeader() {

    const contents = createDaysHeader()
    const classes = useStyles()

    return (
        <Grid container>
            {contents.map((value) => (
                <Grid key={value} className={classes.daysHeaderBox} item>
                    <Card className={classes.card}>
                        <Typography className={clsx(classes.dayHeader, {[classes.summaryHeader] : value === 'Summary'})}>
                            {value}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>    
    )
}
