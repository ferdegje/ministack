import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import ReducerRegisterUser from './redux/reducers/RegisterUser'
import ReducerInit from './redux/reducers/Init'

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

const hist = createBrowserHistory();

const store = createStore(combineReducers({
  ReducerInit,
  ReducerRegisterUser
}))

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          if (prop.private)
            return <PrivateRoute path={prop.path} component={prop.component} key={key} />;  
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
