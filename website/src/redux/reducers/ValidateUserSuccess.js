import * as strings from "../actionsString"
const initialState = {
}

function expireCookie(cname) {
    document.cookie = cname+"= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}
export default function ReducerValidateUserSuccess(state=initialState, action) {
    if (action.type === strings.VALIDATE_USER_SUCCESS) {
        console.log("User is now validated")
        expireCookie("unverified")
        
        return [...state,
        {
        }]
    }
    return state
}