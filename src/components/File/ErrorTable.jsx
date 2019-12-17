import React, { useEffect } from 'react'
import {makeStyles,
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableRow,
        Paper,
        IconButton } from '@material-ui/core'
import { Create, Delete } from '@material-ui/icons'
import { useFile } from '../../hooks/queries/useFile'

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
    }
}))

export default function ErrorTable() {
    const classes = useStyles()
    const { results } = useFile()
    let failedTransactions = results.filter(transaction => transaction.success === false)


    useEffect(() => {
        failedTransactions = results.filter(transaction => transaction.success === false)
    }, [results])
    
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table className={classes.table} size="small" dense='true'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Transaction</TableCell>
                            <TableCell align='right'>Date</TableCell>
                            <TableCell align='right'>Amount</TableCell>
                            <TableCell align='right'>Reason</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {failedTransactions.map(transaction => (
                            <TableRow key={transaction.data.reference}>
                                <TableCell component='th' scope='row'>{transaction.data.name}</TableCell>
                                <TableCell align='right'>{transaction.data.date}</TableCell>
                                <TableCell align='right'>{transaction.data.amount}</TableCell>
                                <TableCell align='right'>{transaction.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            
        </div>
    )
}
