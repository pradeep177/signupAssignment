import { GET_DATA } from '../actions/data'

const initialState = {
    responseData: []
}

export default function getData(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                responseData: action.payload
            }
        default: return state
    }
}