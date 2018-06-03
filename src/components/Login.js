import React, { Component } from 'react'
import { Row, Input, Button,MenuItem,Breadcrumb } from 'react-materialize'
import AuthService from '../services/AuthService'

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    console.log("Component will mount");
    if (this.Auth.loggedIn()) {
      console.log("Already logged in");
      this.props.history.replace('/');
    }
  }

  handleEmailChange(e) {
    this.setState({ "email": e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ "password": e.target.value });
  }

  handleButtonClick() {
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace('/');
      }).catch(err => {
        alert(err);
      })
  }

  render() {

    return (
      <div>
        <div>
        <Breadcrumb>
  <MenuItem>Home</MenuItem>
  <MenuItem>Login</MenuItem>
  </Breadcrumb>
          </div>
        <Row>
          <Input type="email" placeholder="Enter your email" label="Email" s={12} validate onChange={this.handleEmailChange.bind(this)} />
          <Input type="password" label="password" placeholder="Enter your password" s={12} onChange={this.handlePasswordChange.bind(this)} validate />
          <Button waves='light' onClick={this.handleButtonClick.bind(this)}>Login</Button>
        </Row>
      </div>
    )
  }
}


export default Login