import React, { useState, useEffect, useRef, PureComponent } from 'react'
import VectorMap from '@south-paw/react-vector-maps'
import world from './spotify_world.json'
import './map.scss'
import { merge } from 'lodash'
const Tooltip = ({ style, text }) => (
  <div className='tooltip' style={style}>
    {text}
  </div>
)

const Map = ({ clickHandler }) => {
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [tooltip, setToolTip] = useState({
    current: null,
    isTooltipVisible: true,
    tooltipY: 0,
    tooltipX: 0,
  })

  const onMouseOver = e =>
    setToolTip(merge(tooltip, { current: e.target.attributes.name.value }))

  const onMouseMove = e => {
    setToolTip(
      merge(tooltip, {
        isTooltipVisible: true,
        tooltipY: e.clientY + 10,
        tooltipX: e.clientX + 10,
      }),
    )
    console.log(tooltip.isTooltipVisible)
  }

  const onMouseOut = () =>
    setToolTip(merge(tooltip, { current: null, isTooltipVisible: false }))

  const onMouseEnter = e => setHovered(e.target.attributes.name.value)
  const onMouseLeave = () => setHovered(null)
  const onFocus = e => setFocused(e.target.attributes.name.value)
  const onBlur = () => setFocused(null)
  const layerProps = {
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onClick: clickHandler,
    onMouseMove,
    onMouseOver,
    onMouseOut,
  }

  const { current, isTooltipVisible, tooltipX, tooltipY } = tooltip
  const tooltipStyle = {
    display: isTooltipVisible ? 'block' : 'none',
    top: tooltipY,
    left: tooltipX,
  }

  return (
    <>
      <p>
        <strong>Hovered layer:</strong> {hovered}
      </p>
      <p>
        <strong>Focused layer:</strong> {focused}
      </p>
      <div className='map-svg'>
        <VectorMap {...world} layerProps={layerProps} />
        <Tooltip style={tooltipStyle} text={current} />
      </div>
    </>
  )
}

export default Map
