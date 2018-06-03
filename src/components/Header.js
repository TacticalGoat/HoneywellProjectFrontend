import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Button, Card, Row, Col,CardTitle,Breadcrumb,MenuItem,Icon,Chip,Slider,Slide, NavItem } from 'react-materialize'
const Header = () => (
  <div>
    <Navbar  brand='logo' right>
            <ul>
        <li><Link to='/'><Button floating large className='blue' waves='light' icon='home' /></Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </ul>
    </Navbar>
  </div>
)

export default Header