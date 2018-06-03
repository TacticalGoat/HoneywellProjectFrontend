import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Project from './Project'
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
>>>>>>> a9a56042089560852bd1c22879504ec430767a6f
      </Switch>
    </main>
  )
  
  export default Main