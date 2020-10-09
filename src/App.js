import './App.css'

import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import Configuration from './Components/Configuration/Configuration'
import Home from './Pages/Home/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/konfigurator">
            <Configuration/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
          <Route path="/kontakt">
            <Home/>
          </Route>
          <Route path="/zostavy">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;