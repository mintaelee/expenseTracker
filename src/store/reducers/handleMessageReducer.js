import { EXPENSE_ERROR } from '../actionTypes'

const initialState = {
    serverMessage: null,
    messageStyle: {
        fontColorStyle: '',
        dynamicClassName: ''
    }
    
}

export default function(messageState = initialState, {payload, type}) {
    switch(type){
        case EXPENSE_ERROR:
            return{
                serverMessage: payload,
                messageStyle: {
                    fontColorStyle: '#3F51B5',
                    dynamicClassName: 'App'
                }
            }
        default:
            return state
    }
}
