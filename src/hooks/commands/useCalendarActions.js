import { useDispatch } from 'react-redux'
import { apiRequest } from '../../store/actions/api'
import { CREATE_EXPENSE_URL, EDIT_EXPENSE_URL, DELETE_EXPENSE_URL, GET_EXPENSES } from '../../APIEndpoints'
import { toggleCalendar, addExpense, replaceExpense, removeExpense, setUserExpense, handleExpenseError } from '../../store/actions/calendar'

export const toggleCalendarView = dispatch => calendarView => {
    dispatch(
        toggleCalendar({
            calendarView
        })
    )
}

export const createExpense = dispatch => expenseData => {
    let expenseObj = {
        id: expenseData.id,
        name: expenseData.expenseName,
        amount: parseFloat(expenseData.amount),
        date: expenseData.date,
        category: expenseData.category,
        transactionType: expenseData.transactionType
    }
    dispatch(
        apiRequest({
            method: "POST",
            url: CREATE_EXPENSE_URL,
            payload: expenseObj,
            onSuccess: createExpenseSuccess(dispatch),
            onError: createExpenseError(dispatch)
        })
    )
}

export const editExpense = dispatch => expenseData => {
    let expenseObj = {
        id: expenseData._id,
        name: expenseData.name,
        amount: parseFloat(expenseData.amount),
        date: expenseData.date,
        category: expenseData.category 
    }
    dispatch(
        apiRequest({
            method: "POST",
            url: EDIT_EXPENSE_URL,
            payload: expenseObj,
            onSuccess: editExpenseSuccess(dispatch),
            onError: editExpenseError(dispatch)
        })
    )
}

export const deleteExpense = dispatch => expenseData => {
    let expenseObj = {
        id: expenseData.id,
        userID: expenseData.userID
    }
    dispatch(
        apiRequest({
            method: 'DELETE',
            url: DELETE_EXPENSE_URL,
            payload: expenseObj,
            onSuccess: deleteExpenseSuccess(dispatch),
            onError: deleteExpenseError(dispatch)
        })
    )
}

export const getExpenses = dispatch => calendarData => {
    
    let calendarObj = {
        id: calendarData.id,
        startDate: calendarData.startDate,
        endDate: calendarData.endDate
    }
    dispatch(
        apiRequest({
            method: 'GET',
            url: GET_EXPENSES,
            payload: calendarObj,
            onSuccess: getExpensesSuccess(dispatch),
            onError: getExpensesError(dispatch)
        })
    )
}

export const createExpenseSuccess = dispatch => (success) => {
    try {
        dispatch(addExpense(success))
        return Promise.resolve(success)
    } catch (error){
        dispatch(handleExpenseError(error.response.data.messsage))
        return Promise.reject(error)
    }
}
export const createExpenseError = dispatch => ({ error }) => {
    dispatch(handleExpenseError({ error }))
}

export const editExpenseSuccess = dispatch => (success) => {
    try {
        dispatch(replaceExpense(success))
        return Promise.resolve(success)
    } catch (error){
        dispatch(handleExpenseError(error.response.data.messsage))
        return Promise.reject(error)
    }
}
export const editExpenseError = dispatch => ({ error }) => {
    dispatch(handleExpenseError({ error }))
}

export const deleteExpenseSuccess = dispatch => (success) => {
    try {
        dispatch(removeExpense(success))
        return Promise.resolve(success)
    } catch (error){
        dispatch(handleExpenseError(error.response.data.messsage))
        return Promise.reject(error)
    }
}
export const deleteExpenseError = dispatch => ({ error }) => {
    dispatch(handleExpenseError({ error }))
}

export const getExpensesSuccess = dispatch => (success) => {
    try {
        dispatch(setUserExpense(success))
        return Promise.resolve(success)
    } catch (error){
        dispatch(handleExpenseError(error.response.data.messsage))
        return Promise.reject(error)
    }
}
export const getExpensesError = dispatch => ({ error }) => {
    dispatch(handleExpenseError({ error }))
}

export function useCalendarActions() {
    const dispatch = useDispatch()

    return {
        createExpense: createExpense(dispatch),
        editExpense: editExpense(dispatch),
        deleteExpense: deleteExpense(dispatch),
        getExpenses: getExpenses(dispatch),
        toggleCalendarView: toggleCalendarView(dispatch)
    }
}