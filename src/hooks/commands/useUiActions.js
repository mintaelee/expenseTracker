import { useDispatch } from 'react-redux'
import { toggleLoader } from '../../store/actions/ui'

export function useUiActions() {
    const dispatch = useDispatch()

    const toggleLoaderTrue = () => {
        dispatch(
            toggleLoader({
                loaderVisible: true,
                trigger: 'Dispatching toggleLoaderTrue'
            })
        )
    }
    
    const toggleLoaderFalse = () => {
        dispatch(
            toggleLoader({
                loaderVisible: false,
                trigger: 'Dispatching toggleLoaderFalse'
            })
        )
    }
    return { toggleLoaderTrue, toggleLoaderFalse }
}