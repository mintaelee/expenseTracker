import React from 'react'
import { makeStyles, Card, CardActionArea, CardContent, Typography } from '@material-ui/core/'
import { useModalActions } from '../../hooks/commands/useModalActions'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { dateToString } from '../../lib/calendarHelpers/formatDate'

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        width: '100%',
        borderRadius: '0px',
        backgroundColor: '#e4ebf6'
    },
    dayAmount: {
        paddingTop: 24,
        textAlign: 'center',
        fontsize: 14
    }
}))

export default function Summary({data}){
    const classes = useStyles()
    
    const { expenses } = useCalendar()

    let summaryExpenses = expenses.filter(expense => {
        let expenseDate = new Date(expense.date)
        let date = dateToString(expenseDate)
        if (data.week.includes(date)) return expense
    })

    let summaryTotal = summaryExpenses.reduce(((acc, curr) => acc + curr.amount), 0)


    return(
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.dayAmount}>
                    {summaryTotal === 0 ? '' : summaryTotal.toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    )
}
