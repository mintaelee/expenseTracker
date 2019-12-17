import { HANDLE_UPLOAD_SUCCESS, HANDLE_UPLOAD_ERROR } from '../actionTypes'

export const handleUploadSuccess = (success) => ({
    type: HANDLE_UPLOAD_SUCCESS,
    payload: success
})

export const handleUploadError = (error) => ({
    type: HANDLE_UPLOAD_ERROR,
    payload: error
})
