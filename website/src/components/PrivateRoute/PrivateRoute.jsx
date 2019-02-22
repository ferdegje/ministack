import React from "react";
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import fakeAuth from "../../utilities/fakeAuth";

const PleaseLogin = () => (
    <div>
        <h5>Protected content</h5>
        <h6 className="mb-2">To access this content, you first need to login</h6>
        <NavLink to="/login/" className="nav-link">Login</NavLink>
    </div>
)
 
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        // <Component {...props} />
        fakeAuth.isAuth() !== false
        ? <Component {...props} />
        : <PleaseLogin />
    )} />
)

export default PrivateRoute