import React, { useState } from 'react'
import InfoBlock from './InfoBlock'
import dataIndex from '../dataIndex/index'
import avgIndex from '../dataIndex/average'
import Footer from './Footer'
import TimeStamp from './TimeStamp'
import GoTop from './GoTop'
import MapWithInput from './MapWithInput'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ReverseIndex from './ReverseIndex'

const Main = () => {
  const [selected, setSelected] = useState([])
  return (
    <Router>
      <Switch>
        <Route path='/reverse-index'>
          <ReverseIndex />
        </Route>
        <Route path='/'>
          <MapWithInput selectHandler={setSelected} selected={selected} />
          <InfoBlock data={[dataIndex[selected], avgIndex]} />
          <GoTop />
          <Footer />
          <TimeStamp date={dataIndex.timeStamp} />
        </Route>
      </Switch>
    </Router>
  )
}

export default Main
