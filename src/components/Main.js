import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Report from './Report'
import MapPage from './MapPage'
import {
  faInfo,
  faBookOpen,
  faCopyright,
  faShare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route path='/report' component={Report} />
        <Route path='/' component={MapPage} />
      </Switch>

      <div className='foot'>
        <div className='foot-icon-group'>
          <Link to='/about'>
            <div className='svg-container'>
              <FontAwesomeIcon icon={faInfo} />
            </div>
          </Link>
          <Link to='/report'>
            <div className='svg-container'>
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
          </Link>
          <div className='svg-container'>
            <FontAwesomeIcon icon={faCopyright} />
          </div>
          <div
            className='svg-container'
            onClick={() => {
              navigator.permissions
                .query({ name: 'clipboard-write' })
                .then(result => {
                  if (result.state == 'granted' || result.state == 'prompt') {
                    /* write to the clipboard now */
                    navigator.clipboard
                      .writeText(
                        `Checkout this interesting website ${window.location}`,
                      )
                      .then(
                        function() {
                          /* clipboard successfully set */
                        },
                        function() {
                          /* clipboard write failed */
                        },
                      )
                  }
                })
            }}
          >
            <FontAwesomeIcon icon={faShare} />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default Main
