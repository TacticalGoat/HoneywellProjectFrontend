import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Icon, NavItem } from 'react-materialize'
import AuthService from '../services/AuthService';
import logo from './image.ico'
var Img= <img src={logo} />
class Header extends Component {
  constructor() {
    super();
    this.Auth = new AuthService;
  }
  handleLogout(){
    this.Auth.logout()
      .then(res => {
        window.location = '/';
      }).catch(err => {
        alert(err);
      })
  }
  render() {
    if (!this.Auth.loggedIn()) {
      return (
        < div >
          <Navbar className="black" brand={Img}right>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
            </ul>
          </Navbar>
          <br/> <br/> <br/>
        </div >
      )
    }
    else{
      return(
        < div >
          <Navbar className="black" brand={Img} right>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/user/id'>Profile</Link></li>
              <li><a onClick={this.handleLogout.bind(this)}> Logout </a></li>
            </ul>
          </Navbar>
        </div >
      )
    }
  }
}

export default Header