import * as actionTypes from "../actionsString"

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default function validateUser(registrationDetails) {
    let data = registrationDetails
    data.username = getCookie("username")
    return {
        type: actionTypes.VALIDATE_USER,
        payload: {
            request:{
              url:'/validate',
              method: 'post',
              data: data
            }
          },
        registrationDetails
    }
}