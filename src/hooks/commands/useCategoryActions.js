import { useDispatch } from 'react-redux'
import { apiRequest } from '../../store/actions/api'
import { CREATE_CATEGORY_URL, GET_CATEGORY_URL } from '../../APIEndpoints'
import { addCategory, setUserCategories, handleCategoryError } from '../../store/actions/category'

export const createCategory = dispatch => categoryData => {
    let categoryObj = {
        id: categoryData.id,
        name: categoryData.name
    }
    dispatch(
        apiRequest({
            method: "POST",
            url: CREATE_CATEGORY_URL,
            payload: categoryObj,
            onSuccess: createCategorySuccess(dispatch),
            onError: createCategoryError(dispatch)
        })
    )
}

export const getUserCategories = dispatch => userId => {
    dispatch(
        apiRequest({
            method: 'GET',
            url: GET_CATEGORY_URL,
            payload: {id: userId},
            onSuccess: getCategoriesSuccess(dispatch),
            onError: getCategoriesError(dispatch)
        })
    )
}

export const createCategorySuccess = dispatch => (success) => {
    try {
        dispatch(addCategory(success))
        return Promise.resolve(success)
    } catch (error){
        dispatch(handleCategoryError(error.response.data.messsage))
        return Promise.reject(error)
    }
}
export const createCategoryError = dispatch => ({ error }) => {
    dispatch(handleCategoryError({ error }))
}

export const getCategoriesSuccess = dispatch => (success) => {
    try {
        dispatch(setUserCategories(success))
        return Promise.resolve(success)
    } catch (error){
        dispatch(handleCategoryError(error.response.data.messsage))
        return Promise.reject(error)
    }
}
export const getCategoriesError = dispatch => ({ error }) => {
    dispatch(handleCategoryError({ error }))
}

export function useCategoryActions() {
    const dispatch = useDispatch()

    return {
        createCategory: createCategory(dispatch),
        getUserCategories: getUserCategories(dispatch)
    }
}