import React, { useState, useEffect } from 'react'
import {makeStyles,
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableRow,
        IconButton } from '@material-ui/core'
import { Create, Delete, Check, Clear } from '@material-ui/icons'
import { useModal } from '../../hooks/queries/useModal'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { useCalendarActions } from '../../hooks/commands/useCalendarActions'
import { useAuth } from '../../hooks/queries/useAuth'
import { useCategory } from '../../hooks/queries/useCategory'
import TableInput from '../../factory/Input/TableInput'
import formArray from './TransactionTableConfig'
import { dateToString } from '../../lib/calendarHelpers/formatDate'

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    rowDefault: {
        backgroundColor: 'none'
    },
}))

const initialTableState = {
    editing: false,
    deleting: false,
    submitted: false,
    transactions: [],
    editingTransaction: {
        id: '',
        name: '',
        amount: 0,
        date: '',
        category: ''
    },
    deletingTransaction: {
        id: ''
    }
}


export default function TransactionTable({category}) {
    const [tableState, setTableState] = useState(initialTableState)
    const classes = useStyles()
    const { date } = useModal()
    const { expenses } = useCalendar()
    const { editExpense, deleteExpense } = useCalendarActions()
    const { user } = useAuth()
    const { userCategories } = useCategory()
    let { editing, deleting, transactions, editingTransaction, deletingTransaction } = tableState

    const selectedDate = new Date(date)

    const handleEditToggle = (t) => {
        if (t._id === editingTransaction.id){
            editing = false
            editingTransaction = {
                id: '',
                name: '',
                amount: 0,
                date: '',
                category: ''
            }
        } else {
            editing = true
            let date = new Date(t.date)
            editingTransaction = {
                id: t._id,
                name: t.name,
                amount: t.amount,
                date: date,
                category: t.category_id
            }
        }

        transactions.forEach(transaction => {
            if (transaction._id === t._id){
                transaction.editing = !transaction.editing
            } else {
                transaction.editing = false
            }
        })

        setTableState({
            ...tableState,
            editing,
            transactions,
            editingTransaction
        })
    }

    const handleDeleteToggle = (t) => {
        if (t._id === deletingTransaction.id){
            deleting = false
            deletingTransaction = {
                id: '',
            }
        } else {
            deleting = true
            deletingTransaction = {
                id: t._id,
            }
        }

        transactions.forEach(transaction => {
            if (transaction._id === t._id){
                transaction.deleting = !transaction.deleting
            } else {
                transaction.deleting = false
            }
        })

        setTableState({
            ...tableState,
            deleting,
            transactions,
            deletingTransaction
        })
    }

    const handleInputChange = (event) => {
        editingTransaction[event.target.name] = event.target.value
        setTableState({
            ...tableState,
            editingTransaction
        })
    }

    const handleEditSubmit = () => {
        setTableState({
            ...tableState,
            submitted: true
        })

        editExpense(editingTransaction)
    }

    const handleDeleteSubmit = () => {
        setTableState({
            ...tableState,
            submitted: true
        })

        let newExpenseObj = Object.assign({}, deletingTransaction)

        newExpenseObj.userID = user.id

        deleteExpense(newExpenseObj)
    }

    useEffect(() => {
        let selected = []
        console.log(category)
        expenses.forEach(transaction => {
            let foundCategory = userCategories.find(category => category._id === transaction.category_id)
            if (foundCategory){
                console.log(foundCategory._id)
                if (foundCategory._id === category){
                    let expenseObj = {
                        ...transaction,
                        category: foundCategory.name,
                        editing: false,
                        deleting: false
                    }
                    selected.push(expenseObj)
                }
            }
        })


        setTableState({
            ...tableState,
            transactions: selected
        })
    
    }, [category])

    let form = (
        formArray.map((field) => {
            return(
                <TableCell key={field.input.label} align='left'>
                    <TableInput
                        handleInputChange={handleInputChange}
                        {...field}
                        {...editingTransaction}
                    />
                </TableCell>
            )
        })
    )
        
    return (
        <>
            {
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Actions</TableCell>
                            <TableCell align='left'>Transaction</TableCell>
                            <TableCell align='left'>Date</TableCell>
                            <TableCell align='left'>Amount</TableCell>
                            <TableCell align='left'>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transactions.map(transaction => (
                                transaction.editing && <TableRow selected={true} key={transaction.reference}>
                                    <TableCell align='left'>
                                        <IconButton onClick={() => handleEditSubmit()}><Check /></IconButton>
                                        <IconButton onClick={() => handleEditToggle(transaction)}><Clear /></IconButton>
                                    </TableCell>
                                    {form}
                                </TableRow>
                                || transaction.deleting && <TableRow selected={true} className={classes.rowDefault} key={transaction._id}>
                                    <TableCell align='left'>
                                        <IconButton onClick={() => handleDeleteSubmit()}><Delete /></IconButton>
                                        <IconButton onClick={() => handleDeleteToggle(transaction)}><Clear /></IconButton>
                                    </TableCell>
                                    <TableCell align='left' colspan={'4'}>{'Are you sure you want to delete this transaction?'}</TableCell>
                                </TableRow>
                                || !transaction.editing && 
                                <TableRow className={classes.rowDefault} key={transaction._id}>
                                    <TableCell align='left'>
                                        <IconButton onClick={() => handleEditToggle(transaction)}><Create /></IconButton>
                                        <IconButton onClick={() => handleDeleteToggle(transaction)}><Delete /></IconButton>
                                    </TableCell>
                                    <TableCell component='th' scope='row'>{transaction.name}</TableCell>
                                    <TableCell align='left'>{dateToString(new Date(transaction.date))}</TableCell>
                                    <TableCell align='left'>{transaction.amount.toFixed(2)}</TableCell>
                                    <TableCell align='left'>{transaction.category}</TableCell>
                                </TableRow>))
                        }
                    </TableBody>
                </Table>
            }
        </>
    )
}
