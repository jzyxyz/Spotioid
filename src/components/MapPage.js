import React, { useState, useRef } from 'react'
import dataIndex from '../dataIndex/index.json'
import avgIndex from '../dataIndex/average.json'
import MapWithInput from './MapWithInput'
import InfoSegment from './InfoSegment'
import TimeStamp from './TimeStamp'
import NoData from './NoData'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useKeyDown, useWheel } from '../hooks/index'

export default () => {
  const infoSegRef = useRef(null)
  const [selected, setSelected] = useState(undefined)
  const [forceInfo, setForceInfo] = useState(true)

  const data = [dataIndex[selected], avgIndex]
  const CloseBtn = () => (
    <div className='close-info'>
      <FontAwesomeIcon
        icon={faTimes}
        onClick={e => {
          // console.log(e.target)
          const container = e.target.closest('.close-info')
          container.classList.add('hidden')
          infoSegRef.current.classList.remove('de-focus')
          infoSegRef.current.classList.add('animated', 'slideOutDown', 'fast')
          const id = setTimeout(() => {
            infoSegRef.current.classList.remove('animated', 'fadeOut')
            // console.log(container, 222)
            container.classList.remove('hidden')
            setForceInfo(false)
            clearTimeout(id)
          }, 800)
        }}
        onMouseEnter={() => {
          infoSegRef.current.classList.add('de-focus')
        }}
        onMouseLeave={() => {
          infoSegRef.current.classList.remove('de-focus')
        }}
      />
    </div>
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

  let page = 0

  const pageDown = () => {
    const charts = document.querySelectorAll('.chart-container')
    if (!charts.length) return
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

  const wheelHandler = e => {
    console.log('scroll direction:', e.wheelDeltaY)
    if (e.wheelDeltaY < 0) {
      pageDown()
    } else {
      // scroll back here....
    }
  }

  const keyDownHandler = e => {
    if (e.keyCode === 40) {
      // arrow down
      pageDown()
    } else {
    }
  }

  useWheel(wheelHandler)
  useKeyDown(keyDownHandler)

  return (
    <div id='map-page-root'>
      <div className='map-page'>
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
