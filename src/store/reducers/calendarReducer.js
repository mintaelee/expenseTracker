import { TOGGLE_CALENDAR, ADD_EXPENSE, REPLACE_EXPENSE, REMOVE_EXPENSE, SET_USER_EXPENSE } from '../actionTypes'
  
const initialState = {
    calendarView: 'month',
    expenses: []
};

export default function calendarReducer(calendarState = initialState, {payload, type}){

    switch(type){
        case TOGGLE_CALENDAR:
            return {
                ...calendarState,
                calendarView: payload.calendarView
            }
        case ADD_EXPENSE:
            return {
                ...calendarState,
                expenses: [...calendarState.expenses, payload]
            }
        case REPLACE_EXPENSE:
            let replacedExpenses = calendarState.expenses.map(expense => {
                if (expense._id === payload._id){
                    return payload
                } else {
                    return expense
                }
            })
            return {
                ...calendarState,
                expenses: replacedExpenses
            }
        case REMOVE_EXPENSE:
            let removedArray = calendarState.expense.filter(expense => expense._id !== payload._id)
            return {
                ...calendarState,
                expenses: removedArray
            }

        case SET_USER_EXPENSE:
            return {
                ...calendarState,
                expenses: payload
            }
        default:
            return calendarState
    }
}