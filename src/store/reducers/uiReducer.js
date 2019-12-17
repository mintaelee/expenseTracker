import { TOGGLE_LOADER } from '../actionTypes'

const initialState = {
    loading: false
}

export default function uiReducer(uiState = initialState, {payload, type}){
    switch(type){
        case TOGGLE_LOADER:
            return {
                ...uiState,
                loading: payload.loaderVisible
            }
        default:
            return uiState
    }
}