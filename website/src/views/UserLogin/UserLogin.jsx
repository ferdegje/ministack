import React from "react";
import { connect } from 'react-redux'

import registerUser from '../../redux/actions/RegisterUser'
import validateUser from '../../redux/actions/ValidateUser'

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
              
                {this.state.waitingForCode?(
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={6} sm={6} md={6}>
                        <CustomInput
                          labelText="Validation code"
                          id="validation_code"
                          inputProps={this.inputProps}
                          formControlProps={{
                            fullWidth: true
                          }}
                          
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                ):(
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
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="First Name"
                          id="registration_first-name"
                          inputProps={this.inputProps}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Last Name"
                          id="registration_last-name"
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
                      <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                          labelText="Personal quote"
                          id="registration_personal-quote"
                          inputProps={this.inputProps}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                </CardBody>
                )}
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
                      id="email-address"
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
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="info">{this.state.displayCode || "false" } Log in</Button>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserLogin))
