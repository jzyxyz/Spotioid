import React, { useState, useRef, useEffect } from 'react'
import dataIndex from '../dataIndex/index'
import avgIndex from '../dataIndex/average'
import MapWithInput from './MapWithInput'
import InfoSegment from './InfoSegment'
import TimeStamp from './TimeStamp'
import { useWheel } from '../hooks/index'

const NoData = () => (
  <div className='no-data-tip'>No data for this country available</div>
)

export default () => {
  const infoSegRef = useRef(null)
  const [selected, setSelected] = useState(undefined)
  const [forceInfo, setForceInfo] = useState(true)

  let page = 0

  const wheelHandler = () => {
    const charts = document.querySelectorAll('.chart-container')
    charts[page].classList.add('hidden')
    page = (page + 1) % 3
    console.log('current page', page)
    if (charts[page].classList.contains('hidden')) {
      charts[page].classList.remove('hidden')
    }
    charts[page].classList.add('animated', 'fadeIn')
    charts[page].addEventListener('animationend', () => {
      charts[page].classList.remove('animated', 'fadeIn')
    })
  }

  useWheel(wheelHandler)

  const data = [dataIndex[selected], avgIndex]
  const CloseBtn = () => (
    <div
      className='close-info'
      onClick={() => {
        infoSegRef.current.classList.remove('de-focus')
        setForceInfo(false)
      }}
      onMouseEnter={() => {
        infoSegRef.current.classList.add('de-focus')
      }}
      onMouseLeave={() => {
        infoSegRef.current.classList.remove('de-focus')
      }}
    ></div>
  )
  const Info = () =>
    data.some(el => !el) ? (
      <NoData />
    ) : (
      forceInfo && (
        <div id='info-segment-container'>
          <CloseBtn />
          <InfoSegment data={data} ref={infoSegRef} />
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
