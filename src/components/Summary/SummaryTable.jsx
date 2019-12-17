import React from 'react';
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        // minWidth: 700,
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
    categoryRow: {
        '&:hover': {
                    backgroundColor: '#EDEDED',
                    cursor: 'pointer'
                    }
    }
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function percentageFormat(categoryTotal, spendingTotal){
    if (spendingTotal === 0) return `0.00%`
    let percentage = categoryTotal/spendingTotal * 100
    return `${percentage .toFixed(2)}%`
}

function total(items) {
  return items.map(({ value }) => value).reduce((sum, i) => sum + i, 0);
}


export default function SummaryTable({chartMouseOver, chartMouseOut, chartOnClick, data}) {
    const classes = useStyles();
    
    const spendingTotal = total(data);

    const mouseOver = (category) => {
        chartMouseOver(category.index)
    }
    const mouseOut = (category) => {
        chartMouseOut(category.index)
    }

    const handleOnClick = (category) => {
        chartOnClick(category.index)
    }

    return (
        <Paper className={classes.root}>
        <Table className={classes.table} size='small'>
            <TableHead>
            <TableRow>
                <TableCell align="center" colSpan={3}>
                    Spending Detail
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">% of Total</TableCell>
                <TableCell align="right">Total Amount</TableCell>
            </TableRow>   
            </TableHead>
            <TableBody>
                {data.map((category) => {
                    return (
                        <TableRow className={classes.categoryRow} 
                            key={category.title}
                            onMouseOver={() => mouseOver(category)}
                            onMouseOut={() => mouseOut(category)}
                            onClick={() => handleOnClick(category)}
                            style={category.style} >
                            <TableCell>
                                <span className={classes.categoryCircle} style={{backgroundColor: category.color}}></span>
                                <span>{category.title}</span>
                            </TableCell>
                            <TableCell align="right">{percentageFormat(category.value, spendingTotal)}</TableCell>
                            <TableCell align="right">{ccyFormat(category.value)}</TableCell>
                        </TableRow>
                    )
                })}
            <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={1}>Total</TableCell>
                <TableCell align="right">{ccyFormat(spendingTotal)}</TableCell>
            </TableRow>
            {/* <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow> */}
            </TableBody>
        </Table>
        </Paper>
  );
}