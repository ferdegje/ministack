import * as strings from "../actionsString"
const initialState = {
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

export default function ReducerRegisterUserSuccess(state=initialState, action) {
    if (action.type === strings.REGISTER_USER_SUCCESS) {
        console.log("YOUPI")
        setCookie("username", action.payload.data.username, 5)
        setCookie("password", action.payload.data.password, 5)
        setCookie("unverified", "true", 5)
        return [...state,
        {
            registerUserSuccess: {
                "displayCode": true
            }
        }]
    }
    return state
}