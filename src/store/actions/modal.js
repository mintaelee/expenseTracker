import { TOGGLE_EXPENSE_MODAL } from '../actionTypes'

export const toggleExpenseModal = ({
  expenseModalVisible = false,
  date = ''
}) => ({
  type: TOGGLE_EXPENSE_MODAL,
  payload: { expenseModalVisible, date },
});