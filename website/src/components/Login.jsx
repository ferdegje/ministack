import React from "react";

import fakeAuth from "../utilities/fakeAuth"

class Login extends React.Component {
    state = {
      redirectToReferrer: false
    }
    login = () => {
      fakeAuth.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      })
    }
    render() {
      const { redirectToReferrer } = this.state
  
      if (redirectToReferrer === true) {
        return (
            <div>You successfully logged in.</div>
        )
      }
  
      return (
        <div class="row justify-content-center">
            <div class="col-4">
                <h2>Already have an account? Log in here</h2>
                <form>
                    <label for="inputEmail">Email</label>
                    <input type="text" id="inputEmail" className="form-control" aria-describedby="emailHelpBlock" />

                    <label for="inputPassword5">Password</label>
                    <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </small>

                    <button type="submit" className="btn btn-primary mb-2">Log in</button>
                </form>
            </div>
            <div className="col-4">
                <h2>Don't have an account? Create one here</h2>
                <form>
                    <label for="inputEmail">Email</label>
                    <input type="text" id="inputEmail" className="form-control" aria-describedby="emailHelpBlock" />

                    <label for="inputPassword5">Password</label>
                    <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </small>

                    <button type="submit" className="btn btn-primary mb-2">Register</button>
                </form>
            </div>
        </div>
        // <div>
        //     <p>You must log in to view the page</p>
        //     <button onClick={this.login}>Log in</button>
        // </div>
      )
    }
  }

  export default Login