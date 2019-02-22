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

const fakeAuth = {
    isAuthenticated: false,
    authorizationHeader: "",
    isAuth() {
      if (this.isAuthenticated) {
        return true
      }
      let username = getCookie("username")
      let password = getCookie("password")
      let unverified = getCookie("unverified")
      if (unverified === "" && username !== "" && password !== "") {
        this.authorizationHeader = "Basic " + btoa(username + ":" + password)
        this.isAuthenticated = true
        return true
      }
      return false
    },
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100) // fake async
    }
  }

  export default fakeAuth