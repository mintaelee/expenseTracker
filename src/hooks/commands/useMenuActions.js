import { useDispatch } from 'react-redux'
import { toggleMenu } from '../../store/actions/menu'

export function useMenuActions() {
    const dispatch = useDispatch()

    const toggleMenuTrue = (date) => {
        dispatch(
            toggleMenu({
                menuVisible: true,
            })
        )
    }
    
    const toggleMenuFalse = () => {
        dispatch(
            toggleMenu({
                menuVisible: false,
            })
        )
    }
    return { toggleMenuTrue, toggleMenuFalse }
}