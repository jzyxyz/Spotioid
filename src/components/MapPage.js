import React, { useState, useEffect } from 'react'
import dataIndex from '../dataIndex/index'
import avgIndex from '../dataIndex/average'
import MapWithInput from './MapWithInput'
import InfoSegment from './InfoSegment'
import { scrollToTop } from '../utils/index'
import TimeStamp from './TimeStamp'

const NoData = () => (
  <div className='no-data-tip'>No data for this country available</div>
)

export default () => {
  const [selected, setSelected] = useState(undefined)
  const [forceInfo, setForceInfo] = useState(true)

  useEffect(scrollToTop, [])

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
          <TimeStamp date={dataIndex.timeStamp} />
        </div>
      )
    )

  return (
    <div id='map-page-root'>
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
    </div>
  )
}
