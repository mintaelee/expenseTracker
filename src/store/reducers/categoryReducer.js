import { ADD_CATEGORY, SET_USER_CATEGORIES } from '../actionTypes'
  
const initialState = {
    userCategories: []
};

export default function categoryReducer(categoryState = initialState, {payload, type}){
    switch(type){
        case ADD_CATEGORY:
            return {
                ...categoryState,
                userCategories: [...categoryState.userCategories, payload]
            }
        case SET_USER_CATEGORIES:
            return {
                ...categoryState,
                userCategories: payload
            }
        default:
            return categoryState
    }
}