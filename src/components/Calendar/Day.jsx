import React from 'react'
import clsx from 'clsx'
import { makeStyles, Card, CardActionArea, CardContent, Typography } from '@material-ui/core/'
import { useModalActions } from '../../hooks/commands/useModalActions'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { checkDate, dateToString } from '../../lib/calendarHelpers/formatDate'

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        width: '100%',
        borderRadius: '0px'
    },
    actionArea: {
        height: '100%',
        width: '100%'
    },
    notCurrent:{
        color: '#A9A9A9'
    },
    contentArea: {
        height: '100%',
        width: '100%',
        padding: 0,
    },
    day: {
        fontSize: '12px',
        padding: 5,
        paddingLeft: 10,
        height: '20px',
        backgroundColor: 'none',
        fontWeight: 'bold'
    },
    dayAmount: {
        textAlign: 'center',
        padding: 9,
        fontsize: 14
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

export default function Day({data}){
    const classes = useStyles()
    
    const { toggleExpenseModalTrue } = useModalActions()
    const { expenses } = useCalendar()

    const today = checkDate(data.content)

    let dayExpenses = expenses.filter(expense => {
        let expenseDate = new Date(expense.date)
        return dateToString(expenseDate) === dateToString(data.content)
    })

    let dayTotal = dayExpenses.reduce(((acc, curr) => acc + curr.amount), 0)

    const handleOpenExpenseModal = () => {
        toggleExpenseModalTrue(data.content)
    }


    return(
        <Card className={classes.card}>
            <CardActionArea className={classes.actionArea} onClick={handleOpenExpenseModal}>
                <CardContent className={clsx(classes.contentArea, !data.current && classes.notCurrent)}>
                    <Typography className={clsx(classes.day, today && classes.today)}>
                        {data.content.getDate()}
                    </Typography>
                    <Typography className={classes.dayAmount}>
                        {dayTotal === 0 ? '': dayTotal.toFixed(2)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
