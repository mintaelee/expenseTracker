import { GET_CURRENT_DATE, DECREASE_MONTH, INCREASE_MONTH, SET_SELECTED_DATE, SET_WEEK_DATE, DECREASE_WEEK, INCREASE_WEEK } from '../actionTypes'

const initialState = {
    date: {
        year: 2019,
        month: 11,
        currentDate: '',
        startDate: '',
        endDate: '',
        weekStart: '',
        weekEnd: '',
    }
}

export default function dateReducer(dateState = initialState, {type, payload}){
    switch(type){
        case GET_CURRENT_DATE:
            return {
                ...dateState,
                date: payload
            }

        case SET_SELECTED_DATE:
            return {
                date: {
                    ...dateState.date,
                    startDate: payload.startDate,
                    endDate: payload.endDate
                }
            }

        case SET_WEEK_DATE:
            return {
                date: {
                    ...dateState.date,
                    weekStart: payload.weekStart,
                    weekEnd: payload.weekEnd
                }
            }

        case DECREASE_MONTH:
            return {
                date: {
                    ...dateState.date,
                    year: payload.year,
                    month: payload.month,
                    startDate: payload.startDate,
                    endDate: payload.endDate
                }
            }
        case INCREASE_MONTH:
            return {
                date: {
                    ...dateState.date,
                    year: payload.year,
                    month: payload.month,
                    startDate: payload.startDate,
                    endDate: payload.endDate
                }
            }
        case DECREASE_WEEK:
            return {
                date: {
                    ...dateState.date,
                    year: payload.newYear,
                    month: payload.newMonth,
                    startDate: payload.startDate,
                    endDate: payload.endDate,
                    weekStart: payload.weekStart,
                    weekEnd: payload.weekEnd
                }
            }
        case INCREASE_WEEK:
            return {
                date: {
                    ...dateState.date,
                    year: payload.newYear,
                    month: payload.newMonth,
                    startDate: payload.startDate,
                    endDate: payload.endDate,
                    weekStart: payload.weekStart,
                    weekEnd: payload.weekEnd
                }
            }
        default:
            return dateState
    }
}