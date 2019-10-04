import React, { useState } from 'react'
import dataIndex from '../dataIndex/index'
import avgIndex from '../dataIndex/average'
import Footer from './Footer'
import TimeStamp from './TimeStamp'
import MapWithInput from './MapWithInput'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ReverseIndex from './ReverseIndex'
import InfoSegment from './InfoSegment'

const NoData = () => (
  <div className='no-data-tip'>No data for this country available</div>
)

const MapPage = () => {
  const [selected, setSelected] = useState(undefined)
  const [forceInfo, setForceInfo] = useState(true)

  const data = [dataIndex[selected], avgIndex]
  const CloseBtn = () => (
    <div className='close-info' onClick={() => setForceInfo(false)}></div>
  )
  const Info = () =>
    data.some(el => !el) ? (
      <NoData />
    ) : (
      forceInfo && (
        <div>
          <CloseBtn />
          <InfoSegment data={data} />
        </div>
      )
    )

  return (
    <div className='map-segment'>
      <MapWithInput
        selectHandler={country => {
          setSelected(country)
          setForceInfo(true)
        }}
        selected={selected}
      />

      <Info />
    </div>
  )
}

const Main = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/reverse-index'>
            <ReverseIndex />
          </Route>
          <Route path='/' component={MapPage} />
        </Switch>
      </Router>

      <div className='foot'>
        <div className='foot-info'>
          <h3>About </h3>
          <Footer />
          <TimeStamp date={dataIndex.timeStamp} />
        </div>
      </div>
      {/*
       */}
    </>
  )
}

export default Main
