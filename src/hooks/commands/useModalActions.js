import { useDispatch } from 'react-redux'
import { toggleExpenseModal } from '../../store/actions/modal'

export function useModalActions() {
    const dispatch = useDispatch()

    const toggleExpenseModalTrue = (date) => {
        dispatch(
            toggleExpenseModal({
                expenseModalVisible: true,
                date: date
            })
        )
    }
    
    const toggleExpenseModalFalse = () => {
        dispatch(
            toggleExpenseModal({
                expenseModalVisible: false,
                date: ''
            })
        )
    }
    return { toggleExpenseModalTrue, toggleExpenseModalFalse }
}