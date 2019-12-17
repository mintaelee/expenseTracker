import { TOGGLE_MENU } from '../actionTypes'
  
const initialState = {
    menuVisible: false,
};

export default function menuReducer(menuState = initialState, {payload, type}){
    switch(type){
        case TOGGLE_MENU:
            return {
                ...menuState,
                menuVisible: payload.menuVisible
            }
        default:
            return menuState
    }
}