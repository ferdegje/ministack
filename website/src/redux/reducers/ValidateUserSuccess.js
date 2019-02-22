import * as strings from "../actionsString"
const initialState = {
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

export default function ReducerValidateUserSuccess(state=initialState, action) {
    if (action.type === strings.VALIDATE_USER_SUCCESS) {
        console.log("User is now validated")
        setCookie("unverified", "true", -1)
        return [...state,
        {
        }]
    }
    return state
}