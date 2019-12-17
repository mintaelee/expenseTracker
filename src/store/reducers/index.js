import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import authReducer from './authReducer'
import dateReducer from './dateReducer'
import modalReducer from './modalReducer'
import categoryReducer from './categoryReducer'
import calendarReducer from './calendarReducer'
import menuReducer from './menuReducer'
import fileReducer from './fileReducer'

export const rootReducer = combineReducers({
    ui: uiReducer,
    authUser: authReducer,
    date: dateReducer,
    modal: modalReducer,
    category: categoryReducer,
    calendar: calendarReducer,
    menu: menuReducer,
    file: fileReducer
})