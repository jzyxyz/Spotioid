import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Report from './Report'
import MapPage from './MapPage'

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route path='/report' component={Report} />
        <Route path='/' component={MapPage} />
      </Switch>
      {/* 
      <div className='foot'>
        <div className='foot-info'>
          <div>About the Project </div>
          <Link to='/report'>
            <div>Read weekly Report</div>
          </Link>
        </div>
      </div> */}
    </Router>
  )
}

export default Main
