import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Icon, NavItem } from 'react-materialize'

const Header = () => (
  <div>
    <Navbar brand='lambda' right>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </ul>
    </Navbar>
  </div>
)

export default Header