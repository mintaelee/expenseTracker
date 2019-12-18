import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {makeStyles,
        lighten } from '@material-ui/core/styles'
import {Paper,
        Table,
        TableBody,
        TableCell,
        TableHead,
        TableRow,
        TableSortLabel,
        Toolbar,
        Tooltip,
        Typography,
        Checkbox,
        IconButton } from '@material-ui/core'
import { Create, Delete, Check, Clear, FilterList, CheckBox } from '@material-ui/icons'
import { useModal } from '../../hooks/queries/useModal'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { useCalendarActions } from '../../hooks/commands/useCalendarActions'
import { useAuth } from '../../hooks/queries/useAuth'
import { useCategory } from '../../hooks/queries/useCategory'
import TableInput from '../../factory/Input/TableInput'
import formArray from './TransactionTableConfig'
import { dateToString } from '../../lib/calendarHelpers/formatDate'

const useStyles = makeStyles(theme => ({
    paper: {
        top: '-300px'
    },
    table: {
        minWidth: 650,
    },
    rowDefault: {
        backgroundColor: 'none'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
}))

const initialTableState = {
    editing: false,
    deleting: false,
    submitted: false,
    transactions: [],
    editingTransaction: {
        category: ''
    },
    deletingTransaction: {
        id: ''
    },
    selected: [],
    order: 'asc',
    orderBy: 'date'
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  
function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Transaction' },
    { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount ($)' },
    { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
  ];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

const useToolbarStyles = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected, editing, deleting, editToggle, editSubmit, editingTransaction, handleInputChange } = props;

    let form = (
        formArray.map((field) => {
            return(
                <TableInput
                    key={field.input.label}
                    {...field}
                    {...editingTransaction}
                    handleInputChange={handleInputChange}
                />
            )
        })
    )
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
              Transactions
          </Typography>
        )}
  
        {numSelected > 0 ? (
            editing ? (
                <> 
                    {form}
                    <Tooltip title="Check">
                        <IconButton onClick={() => editSubmit()}aria-label="check">
                            <Check />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Clear">
                        <IconButton onClick={() => editToggle()} aria-label="clear">
                            <Clear />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <>
                <Tooltip title="Edit">
                    <IconButton onClick={() => editToggle()} aria-label="Edit">
                        <Create />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <Delete />
                    </IconButton>
                </Tooltip>
                </>
            )
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterList />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };


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

    const handleRequestSort = (event, property) => {
        const isDesc = tableState.orderBy === property && tableState.order === 'desc';
        
        setTableState({
            ...tableState,
            order: isDesc ? 'asc' : 'desc',
            orderBy: property
        })
    }
    
    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = transactions.map(n => n._id);
            setTableState({
                ...tableState,
                selected: newSelecteds
            })
            return;
        }
        setTableState({
            ...tableState,
            selected: []
        })
    }

    const handleClick = (event, id) => {
        const selectedIndex = tableState.selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(tableState.selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(tableState.selected.slice(1));
        } else if (selectedIndex === tableState.selected.length - 1) {
          newSelected = newSelected.concat(tableState.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            tableState.selected.slice(0, selectedIndex),
            tableState.selected.slice(selectedIndex + 1),
          );
        }
    
        setTableState({
            ...tableState,
            selected: newSelected
        });
    };

    const isSelected = id => tableState.selected.indexOf(id) !== -1

    

    const handleEditToggle = () => {
        editingTransaction.category = category

        setTableState((prevState) => {
            return{
                ...prevState,
                editing: !prevState.editing,
                editingTransaction
            }
        })
    }

    // const handleDeleteToggle = (t) => {
    //     if (t._id === deletingTransaction.id){
    //         deleting = false
    //         deletingTransaction = {
    //             id: '',
    //         }
    //     } else {
    //         deleting = true
    //         deletingTransaction = {
    //             id: t._id,
    //         }
    //     }

    //     transactions.forEach(transaction => {
    //         if (transaction._id === t._id){
    //             transaction.deleting = !transaction.deleting
    //         } else {
    //             transaction.deleting = false
    //         }
    //     })

    //     setTableState({
    //         ...tableState,
    //         deleting,
    //         transactions,
    //         deletingTransaction
    //     })
    // }

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
        tableState.selected.forEach((transactionID) => {
            let transaction = transactions.find(element => element._id === transactionID)
            console.log(transaction)
            transaction.category = editingTransaction.category
            editExpense(transaction)
        })
        // editExpense(editingTransaction)
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
        let categoryTrans = []
        expenses.forEach(transaction => {
            let foundCategory = userCategories.find(category => category._id === transaction.category_id)
            if (foundCategory){
                if (foundCategory._id === category){
                    let expenseObj = {
                        ...transaction,
                        category: foundCategory.name,
                        editing: false,
                        deleting: false
                    }
                    categoryTrans.push(expenseObj)
                }
            }
        })


        setTableState({
            ...tableState,
            transactions: categoryTrans
        })
    
    }, [category])
        
    return (
        <>
            <Paper className={classes.paper}>
            <EnhancedTableToolbar 
                numSelected={tableState.selected.length}
                editing={editing}
                deleting={deleting}
                editToggle={handleEditToggle}
                editSubmit={handleEditSubmit}
                handleInputChange={handleInputChange}
                editingTransaction={editingTransaction}
            />
            {   
                <Table className={classes.table} size="small">
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={tableState.selected.length}
                        order={tableState.order}
                        orderBy={tableState.orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={transactions.length}
                    />
                    <TableBody>
                        {stableSort(transactions, getSorting(tableState.order, tableState.orderBy))
                            .map((row, index) => {
                                const isItemSelected = isSelected(row._id)
                                const labelId = `table-checkbox-${index}`
                                
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => handleClick(event, row._id)}
                                        role='checkbox'
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row._id}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </TableCell>
                                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{dateToString(new Date(row.date))}</TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                        <TableCell align="right">{row.category}</TableCell>
                                    </TableRow>
                                )
                            })}
                        {/* {
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
                        } */}
                    </TableBody>
                </Table>
            }
            </Paper>
        </>
    )
}
