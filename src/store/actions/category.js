import { ADD_CATEGORY, SET_USER_CATEGORIES } from '../actionTypes'

export const addCategory = (category) => ({
    type: ADD_CATEGORY,
    payload: category
})

export const setUserCategories = (categories) => ({
    type: SET_USER_CATEGORIES,
    payload: categories
})

export const handleCategoryError = (error) => {
    console.log(error)
}