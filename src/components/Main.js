import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </main>
  )
  
  export default Main