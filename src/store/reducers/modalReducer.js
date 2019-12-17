import { TOGGLE_EXPENSE_MODAL } from '../actionTypes'
  
const initialState = {
    expenseModalVisible: false,
    date: ''
};

export default function modalReducer(modalState = initialState, {payload, type}){
    switch(type){
        case TOGGLE_EXPENSE_MODAL:
            return {
                ...modalState,
                expenseModalVisible: payload.expenseModalVisible,
                date: payload.date
            }
        default:
            return modalState
    }
}