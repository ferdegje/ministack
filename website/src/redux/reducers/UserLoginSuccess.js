import * as strings from "../actionsString"
const initialState = {
}

function expireCookie(cname) {
    document.cookie = cname+"= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}
export default function ReducerUserLoginSuccess(state=initialState, action) {
    if (action.type === strings.USER_LOGIN_SUCCESS) {
        expireCookie("pendingLogin")  
        console.log("ok yes yes")    
        return [...state,
        {
            action: action
        }]
    }
    return state
}