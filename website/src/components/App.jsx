// src/components/App.jsx
import React from "react";
import Home from "../routes/Home";
import PrivateRoute from "./PrivateRoute";
import Login from './Login';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;
const ArticleDeepDive = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;
const App= () => (
  <Router>
    <div className="container-fluid">
        <div className="row align-items-center">
            <div className="col justify-content-left">
                <img src="https://uk.depaulcharity.org/sites/default/files/logo-depaul.png" height="150px" alt="Logo"></img>
            </div>

            <div className=".col-md-3 .offset-md-6">
                <nav>
                    <ul className="nav nav-pills">
                    <li className="nav-item">
                        <NavLink to="/home" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about/" className="nav-link">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login/" className="nav-link">Login</NavLink>
                    </li>
                    </ul>
                </nav>
            </div>
            
        </div>
      

      <Route path="/home/" exact component={Home} />
      <PrivateRoute path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Route path="/login/" component={Login} />
      <Route path="/home/:id" component={ArticleDeepDive} />
    </div>
  </Router>
);

export default App;

// import React from "react";
// import List from "./List.jsx";
// import Form from "./Form.jsx";
// const App = () => (
    
//   <div className="row mt-5">
//     <div className="col-md-4 offset-md-1">
//       <h2>Articles</h2>
//       <List />
//     </div>
//     <div className="col-md-4 offset-md-1">
//       <h2>Add a new article</h2>
//       <Form />
//     </div>
//   </div>
// );
// export default App;