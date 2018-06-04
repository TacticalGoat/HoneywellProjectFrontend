import React from 'react'
import { Button, Card, Row, Col,CardTitle,Footer,Icon } from 'react-materialize';
const Foot = () => (
  <div>
    <Footer   copyrights="@ Micro Funding"
  moreLinks={
    <a className="grey-text text-lighten-4 right" href="#!"></a>
  }
  links={
    <ul>
      <li><a className="grey-text text-lighten-3" href="#!">Blog</a></li>
      <li><a className="grey-text text-lighten-3" href="#!">Facebook</a></li>
      <li><a className="grey-text text-lighten-3" href="#!">Twitter</a></li>
      <li><a className="grey-text text-lighten-3" href="#!">LinkedIn</a></li>
    </ul>
  }
  className='example'
>
    <h5 className="white-text">About Us</h5>
    <p className="grey-text text-lighten-4">We are Providing a platform for supporting community projects</p>
</Footer>;
  </div>
)

export default Foot