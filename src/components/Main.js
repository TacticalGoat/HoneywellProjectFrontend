import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import UserProfile from './UserProfile';
import Project from './Project';
import AddProject from './AddProject';

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/user/id' component={UserProfile}/>
        <Route path='/project/:id' component={Project}/>
        <Route exact path='/addproject' component={AddProject}/>
      </Switch>
    </main>
  )
  
  export default Main