import React, { useState, useEffect, useRef } from 'react'
import VectorMap from '@south-paw/react-vector-maps'
import world from './spotify_world.json'
import './map.scss'

const Map = ({ clickHandler }) => {
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)

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
      </div>
    </>
  )
}

export default Map
