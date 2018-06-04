import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
<<<<<<< HEAD
import UserProfile from './UserProfile';
import Project from './Project';
import AddProject from './AddProject';

=======
import Project from './Project'
>>>>>>> 448a376732318ba25c04ae2cad93c3026fd4e9de
const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
<<<<<<< HEAD
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/project' component={Project}/>
=======
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
<<<<<<< HEAD
        <Route path='/user/id' component={UserProfile}/>
        <Route path='/project/:id' component={Project}/>
        <Route exact path='/addproject' component={AddProject}/>
=======
>>>>>>> a9a56042089560852bd1c22879504ec430767a6f
>>>>>>> 448a376732318ba25c04ae2cad93c3026fd4e9de
      </Switch>
    </main>
  )
  
  export default Main