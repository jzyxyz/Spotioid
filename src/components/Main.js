import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Report from './Report'
import MapPage from './MapPage'
import Footer from './Footer'

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route path='/report' component={Report} />
        <Route path='/' component={MapPage} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default Main
