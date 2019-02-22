import React from "react";
import { connect } from 'react-redux'

import registerUser from '../../redux/actions/RegisterUser'
import validateUser from '../../redux/actions/ValidateUser'
import userLogin from '../../redux/actions/UserLogin'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


class UserLogin extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
    this.inputProps = {
      onChange: this.inputChanged
    }
  }

  validateCode = () => {
    this.props.validateUser({"code": this.state.validation_code})
  }

  userLogin = () => {
    var loginDetails = {
      "email": this.state.loginemail,
      "password": this.state.loginpassword
    }
    this.props.userLogin(loginDetails)
  }

  registerBtnClick = () => {
    let registrationDetails = {}
    for (var k in this.state) {
      if (k.replace("registration_","") !== k) {
        registrationDetails[k.replace("registration_", "")] = this.state[k]
      }
    }
    this.props.registerUser(registrationDetails)
    this.setState({"waitingForCode": true})
  }

  inputChanged = (evt) => {
    // this.state.email = evt.target.value
    let obj = {}
    obj[evt.target.id] = evt.target.value
    this.setState(obj)
  }

  handleFieldChange = (field) => (event, value, selectedKey) => {
    // make a copy of the object first to avoid changes by reference
    let data = { ...this.state.data };
    console.log(value)
    // use here event or value of selectedKey depending on your component's event
    data[field] = value;
    this.setState({ data });
  }

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={this.props.classes.cardTitleWhite}>Register</h4>
                <p className={this.props.classes.cardCategoryWhite}>Create your account</p>
              </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Email address"
                          id="registration_email"
                          inputProps={this.inputProps}
                          formControlProps={{
                            fullWidth: true
                          }}
                          
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Password"
                          id="registration_password"
                          inputProps={this.inputProps}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      { this.state.waitingForCode?(
                        <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                          labelText="Validation code"
                          id="validation_code"
                          inputProps={this.inputProps}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      ):(<GridItem></GridItem>)}
                      
                    </GridContainer>
                </CardBody>
                
              <CardFooter>
                {this.state.waitingForCode? (
                  <Button color="primary" onClick={this.validateCode}>Validate code</Button>
                ):(
                  <Button color="primary" onClick={this.registerBtnClick}>Create Account</Button>
                )}
                
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
          <Card>
              <CardHeader color="info">
                <h4 className={this.props.classes.cardTitleWhite}>Login</h4>
                <p className={this.props.classes.cardCategoryWhite}>Use your existing credentials</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email address"
                      id="loginemail"
                      inputProps={this.inputProps}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Password"
                      id="loginpassword"
                      inputProps={this.inputProps}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="info" onClick={this.userLogin}>Log in</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registerUserSuccess: state.registerUserSuccess
})

const mapDispatchToProps = dispatch => ({
  registerUser: registrationDetails => dispatch(registerUser(registrationDetails)),
  validateUser: data => dispatch(validateUser(data)),
  userLogin: data => dispatch(userLogin(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserLogin))
