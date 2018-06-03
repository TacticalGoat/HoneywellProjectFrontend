import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import AuthService from '../services/AuthService';
class Register extends Component {

  constructor() {
    super();
    this.Auth = new AuthService();
  }
  
  componentDidMount(){
    if(this.Auth.loggedIn())
      this.props.history.replace('/')
  }
  
  handleEmailChange(e) {
    this.setState({ "email": e.target.value });
  }

  handleBioChange(e) {
    this.setState({ "bio": e.target.value });
  }

  handleNameChange(e) {
    this.setState({ "name": e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ "password": e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ "phone": e.target.value });
  }

  handleButtonClick() {
    this.Auth.register(this.state.email, this.state.password,
      this.state.name, this.state.phone, this.state.bio)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      })
  }
  render() {

    return (
      <div>
        <Row>
          <Input type="email" placeholder="Enter your email" label="Email" s={12} validate onChange={this.handleEmailChange.bind(this)} validate />
          <Input type="password" label="password" placeholder="Enter your password" s={12} onChange={this.handlePasswordChange.bind(this)} validate />
          <Input label="Name" placeholder="Enter your name" s={12} onChange={this.handleNameChange.bind(this)} validate />
          <Input type="tel" label="Phone" placeholder="Enter your phone number" s={12} onChange={this.handlePhoneChange.bind(this)} validate />
          <Input type="textarea" label="Bio" placeholder="Tell us something about yourself" s={12} onChange={this.handleBioChange.bind(this)} />
          <Button waves='light' onClick={this.handleButtonClick.bind(this)} >Register</Button>
        </Row>
      </div>
    )
  }
}

export default Register