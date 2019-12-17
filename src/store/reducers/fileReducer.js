import { HANDLE_UPLOAD_SUCCESS, HANDLE_UPLOAD_ERROR } from '../actionTypes'
  
const initialState = {
    results: []
};

export default function fileReducer(fileState = initialState, {payload, type}){
    switch(type){
        case HANDLE_UPLOAD_SUCCESS:
            return {
                ...fileState,
                results: payload
            }
        default:
            return fileState
    }
}