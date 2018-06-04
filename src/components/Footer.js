import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Icon, NavItem,Footer } from 'react-materialize'
import AuthService from '../services/AuthService';
class Foot extends Component {
   render(){ return (
        < div >
          <Footer  copyrights="© 2018 by Arjun,Parul,Srikar"
 
  links={
    <ul>
      <li><a className="grey-text text-lighten-3" href="#!">Blog</a></li>
      <li><a className="grey-text text-lighten-3" href="#!">Twitter</a></li>
      <li><a className="grey-text text-lighten-3" href="#!">Facebook</a></li>
      <li><a className="grey-text text-lighten-3" href="#!">LinkedIn</a></li>
    </ul>
  }
  className='example'
>
    <h5 className="white-text"></h5>
    <p className="grey-text text-lighten-4">Education is for improving the
lives of others and for leaving
your community and world better
than you founded.</p>
</Footer>
</div>
      )
    }
}
export default Foot