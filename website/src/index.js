import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import ReducerRegisterUser from './redux/reducers/RegisterUser'
import ReducerInit from './redux/reducers/Init'
import ReducerRegisterUserSuccess from './redux/reducers/RegisterUserSuccess'
import ReducerValidateUserSuccess from './redux/reducers/ValidateUserSuccess'
import ReducerUserLoginSuccess from './redux/reducers/UserLoginSuccess'
import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import fakeAuth from './utilities/fakeAuth'

const hist = createBrowserHistory();

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL:'https://packathonapi.gopackathon.com/',
  responseType: 'json'
});

// var authorizationHeader = ""

// if (fakeAuth.isAuth()) {
//   authorizationHeader = fakeAuth.authorizationHeader
// }

client.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (fakeAuth.isAuth()) {
    console.log("User is authenticated")
    config.headers.Authorization = fakeAuth.authorizationHeader
  }
  console.log("Axios config", config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const store = createStore(
  combineReducers({
    ReducerInit,
    ReducerRegisterUser,
    ReducerRegisterUserSuccess,
    ReducerValidateUserSuccess,
    ReducerUserLoginSuccess,
  }),
  applyMiddleware(
    //all middlewares
    axiosMiddleware(client), //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          if (prop.private) {
            console.log("Private", prop)
            return <PrivateRoute path={prop.path} component={prop.component} key={key} />;  
          }
          console.log("Public", prop)
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
