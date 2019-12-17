import { useDispatch } from 'react-redux'
import { apiRequest } from '../../store/actions/api'
import { UPLOAD_FILE_URL } from '../../APIEndpoints'
import { handleUploadSuccess, handleUploadError } from '../../store/actions/file'

export const uploadFile = dispatch => fileData => {
    let expenseObj = {
        id: fileData.id,
        bankName: fileData.name,
        transactions: fileData.transactions,
    }
    dispatch(
        apiRequest({
            method: "POST",
            url: UPLOAD_FILE_URL,
            payload: expenseObj,
            onSuccess: uploadFileSuccess(dispatch),
            onError: uploadFileError(dispatch)
        })
    )
}

export const uploadFileSuccess = dispatch => (success) => {
    try {
        dispatch(handleUploadSuccess(success))
        return Promise.resolve(success)
    } catch (error){
        dispatch(handleUploadError(error.response.data.messsage))
        return Promise.reject(error)
    }
}
export const uploadFileError = dispatch => ({ error }) => {
    dispatch(handleUploadError({ error }))
}

export function useFileActions() {
    const dispatch = useDispatch()

    return {
        uploadFile: uploadFile(dispatch),
    }
}