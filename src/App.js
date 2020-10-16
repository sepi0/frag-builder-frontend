import React from 'react'
import {Route, Switch, BrowserRouter as Router, HashRouter} from 'react-router-dom'

import Configuration from './Pages/Configuration'
import Home from './Pages/Home'
import Builds from './Pages/Builds'
function App() {
  return (
    <HashRouter basename={'/'}>
      <Switch> 
        <Route exact path="/" component={Home}/>
        <Route exact path="/konfigurator" component={Configuration}/>
        <Route exact path="/zostavy" component={Builds}/>
      </Switch>
    </HashRouter>
  )
}

export default App;