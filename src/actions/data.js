export const GET_DATA = "GET_DATA"

export function getData(payload) {
    console.log("action")
    return {
        type: GET_DATA,
        payload: payload
    }
}