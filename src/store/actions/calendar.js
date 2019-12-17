import { TOGGLE_CALENDAR, ADD_EXPENSE, REPLACE_EXPENSE, REMOVE_EXPENSE, SET_USER_EXPENSE, EXPENSE_ERROR } from '../actionTypes'

export const toggleCalendar = (calendarView) => ({
    type: TOGGLE_CALENDAR,
    payload: calendarView
})

export const addExpense = (expenseData) => ({
    type: ADD_EXPENSE,
    payload: expenseData
})

export const replaceExpense = (expenseData) => ({
    type: REPLACE_EXPENSE,
    payload: expenseData
})

export const removeExpense = (expenseData) => ({
    type: REMOVE_EXPENSE,
    payload: expenseData
})

export const setUserExpense = (expenseData) => ({
    type: SET_USER_EXPENSE,
    payload: expenseData
})

export const handleExpenseError = (error) => ({
    type: EXPENSE_ERROR,
    payload: error
})