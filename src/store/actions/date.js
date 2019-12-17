import { GET_CURRENT_DATE, SET_SELECTED_DATE, SET_WEEK_DATE, DECREASE_MONTH, INCREASE_MONTH, DECREASE_WEEK, INCREASE_WEEK } from '../actionTypes'

export const setDate = ({
    date = {
        year: 2019,
        month: 11,
        currentDate: ''
    },
    trigger
}) => ({
    type: GET_CURRENT_DATE,
    payload: date,
    meta: {trigger}
})

export const setSelectedDate = ({startDate, endDate}) => ({
    type: SET_SELECTED_DATE,
    payload: {
        startDate,
        endDate
    }
})

export const setWeekDate = ({weekStart, weekEnd}) => ({
    type: SET_WEEK_DATE,
    payload: {
        weekStart,
        weekEnd
    }
})

export const decreaseMonth = ({month, year, startDate, endDate,}) => ({
    type: DECREASE_MONTH,
    payload: {
        month,
        year,
        startDate,
        endDate
    }
})

export const increaseMonth = ({month, year, startDate, endDate}) => ({
    type: INCREASE_MONTH,
    payload: {
        month,
        year,
        startDate,
        endDate
    }
})
export const decreaseWeek = ({newMonth, newYear, startDate, endDate, weekStart, weekEnd }) => ({
    type: DECREASE_WEEK,
    payload: {
        newMonth,
        newYear,
        startDate,
        endDate,
        weekStart,
        weekEnd
    }
})

export const increaseWeek = ({newMonth, newYear, startDate, endDate, weekStart, weekEnd}) => ({
    type: INCREASE_WEEK,
    payload: {
        newMonth,
        newYear,
        startDate,
        endDate,
        weekStart,
        weekEnd
    }
})