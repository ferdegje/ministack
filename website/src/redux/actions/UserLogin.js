import * as actionTypes from "../actionsString"

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default function userLogin(loginDetails) {
    setCookie("username", loginDetails.email, 10)
    setCookie("password", loginDetails.password, 10)
    setCookie("pendingLogin", "yes", 10)
    return {
        type: actionTypes.USER_LOGIN,
        payload: {
            request:{
              url:'/user',
              method: 'get',
            }
          }
    }
}