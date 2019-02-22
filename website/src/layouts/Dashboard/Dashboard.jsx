/* eslint-disable */
import React from "react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import fakeAuth from "../../utilities/fakeAuth";
import UserLogin from "../../views/UserLogin/UserLogin";


const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      if (prop.private && !fakeAuth.isAuth())
        return <Route path={prop.path} component={UserLogin} key={key} />;  
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  stateChange(data) {
    console.log("State has changed", data)
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("userLogin", this.render)
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    console.log("I am being rerendered")
    console.log(this.props)
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={this.props.ReducerTestReducer.testReducer}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                <Switch>
                  {dashboardRoutes.map((prop, key) => {
                    if (prop.redirect)
                      return <Redirect from={prop.path} to={prop.to} key={key} />;
                    if (prop.private && !fakeAuth.isAuth())
                      return <Route path={prop.path} component={UserLogin} key={key} />;  
                    return <Route path={prop.path} component={prop.component} key={key} />;
                  })}
                </Switch>
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              <Switch>
                  {dashboardRoutes.map((prop, key) => {
                    if (prop.redirect)
                      return <Redirect from={prop.path} to={prop.to} key={key} />;
                    if (prop.private && !fakeAuth.isAuth())
                      return <Route path={prop.path} component={UserLogin} key={key} />;  
                    return <Route path={prop.path} component={prop.component} key={key} />;
                  })}
                </Switch>
            </div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { 
    ReducerTestReducer: state.ReducerTestReducer,
    ReducerUserLoginSuccess: state.ReducerUserLoginSuccess
  }
};

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(dashboardStyle)(App))
