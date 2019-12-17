import React from 'react'
import clsx from 'clsx'
import { makeStyles, Card, CardActionArea, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core/'
import { useModalActions } from '../../hooks/commands/useModalActions'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { useCategory } from '../../hooks/queries/useCategory'
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
    contentArea: {
        height: '100%',
        width: '100%',
        padding: 0,
    },
    table:{

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
    },
    categoryCircle: {
        borderRadius: '50%',

    },
    totalCell: {
        fontWeight: 'bolder'
    }
}))

export default function Day({data}){
    const classes = useStyles()
    
    const { toggleExpenseModalTrue } = useModalActions()
    const { expenses } = useCalendar()
    const { userCategories } = useCategory()


    const today = checkDate(data.content)

    let dayExpenses = expenses.filter(expense => {
        let expenseDate = new Date(expense.date)
        return dateToString(expenseDate) === dateToString(data.content)
    })

    let dayTotal = dayExpenses.reduce(((acc, curr) => acc + curr.amount), 0)

    let dayCategories = userCategories.map(category => {
        let matchingExpenses = dayExpenses.filter(expense => expense.category_id === category._id)
        let categoryValue = matchingExpenses.reduce(((acc, curr) => acc + curr.amount), 0)
        let categoryData = {
            title: category.name,
            value: categoryValue,
        }
        return categoryData
    })

    const handleOpenExpenseModal = () => {
        toggleExpenseModalTrue(data.content)
    }


    return(
        <Card className={classes.card}>
            <CardActionArea className={classes.actionArea} onClick={handleOpenExpenseModal}>
                <CardContent className={clsx(classes.contentArea, !data.current && classes.notCurrent)}>
                    <Table className={classes.table} size='small'>
                        <TableBody>
                            {dayCategories.map(dayCategory => (
                                <TableRow key={dayCategory.title}>
                                    <TableCell className={classes.tableCell} align='right'>
                                        <span>{dayCategory.value === 0 ? 0 : dayCategory.value.toFixed(2)}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow key={'daily-total'}>
                                <TableCell className={classes.totalCell} align='right'>
                                    <span>{dayTotal === 0 ? 0 : dayTotal.toFixed(2)}</span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {/* <Typography className={clsx(classes.day, today && classes.today)}>
                        {data.content.getDate()}
                    </Typography>
                    <Typography className={classes.dayAmount}>
                        {dayTotal === 0 ? '': dayTotal.toFixed(2)}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
