import React from 'react'
import { makeStyles, Card, CardContent, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core/'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { dateToString } from '../../lib/calendarHelpers/formatDate'
import { useCategory } from '../../hooks/queries/useCategory'
import { categoryColors } from '../../lib/calendarHelpers/constants'

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        width: '100%',
        borderRadius: '0px',
        backgroundColor: '#e4ebf6'
    },
    contentArea: {
        height: '100%',
        width: '100%',
        padding: 0,
    },
    categoryCircle: {
        width: '.75rem',
        height: '.75rem',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '5px',
        top: '.125rem',
        position: 'relative'
    },
    totalCell: {
        fontWeight: 'bolder'
    }
    // tableCell: {
    //     fontSize: '.75rem'
    // }
}))

export default function Summary({data}){
    const classes = useStyles()
    
    const { expenses } = useCalendar()
    const { userCategories } = useCategory()

    let summaryExpenses = expenses.filter(expense => {
        let expenseDate = new Date(expense.date)
        let date = dateToString(expenseDate)
        if (data.week.includes(date)) return expense
    })

    let summaryTotal = summaryExpenses.reduce(((acc, curr) => acc + curr.amount), 0)

    let summaryCategories = userCategories.map(category => {
        let matchingExpenses = summaryExpenses.filter(expense => expense.category_id === category._id)
        let categoryValue = matchingExpenses.reduce(((acc, curr) => acc + curr.amount), 0)
        let color = categoryColors[category.name] || '#b84242'
        
        if (category.name === '') category.name = 'UNKNOWN'
        let categoryData = {
            color: color,
            title: category.name,
            value: categoryValue,
        }
        return categoryData
    })


    return(
        <Card className={classes.card}>
            <CardContent className={classes.contentArea}>
                <Table className={classes.table} size='small'>
                    <TableBody>
                        {summaryCategories.map(summaryCategory => (
                            <TableRow key={summaryCategory.title}>
                                {data.contentType === 'Summary' ? 
                                    <TableCell align='right' className={classes.tableCell}>{summaryCategory.value === 0 ? 0 : summaryCategory.value.toFixed(2)}</TableCell>
                                    : <TableCell className={classes.tableCell}>
                                        <span className={classes.categoryCircle} style={{backgroundColor: summaryCategory.color}}></span>
                                        <span>{summaryCategory.title}</span>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                        <TableRow key={'daily-total'}>
                            {data.contentType === 'Summary'
                                ? <TableCell align='right' className={classes.totalCell}>{summaryTotal === 0 ? 0 : summaryTotal.toFixed(2)}</TableCell>
                                : <TableCell className={classes.totalCell}>
                                    <span>{'Total'}</span>
                                </TableCell>
                                }
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
