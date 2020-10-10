import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import Configuration from './Pages/Configuration'
import Home from './Pages/Home'
import Builds from './Pages/Builds'
import Contact from './Pages/Contact'

function App() {
  return (
    <Router>
      <Switch> 
        <Route exact path="/" component={Home}/>
        <Route exact path="/konfigurator" component={Configuration}/>
        <Route exact path="/kontakt" component={Contact}/>
        <Route exact path="/zostavy" component={Builds}/>
      </Switch>
    </Router>
  )
}

export default App;