import React, { useState } from 'react'
import VectorMap from '@south-paw/react-vector-maps'
import world from './spotify_world.json'
import './map.scss'

const Map = ({ dataIndex }) => {
  const [clicked, setClicked] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const onMouseEnter = e => setHovered(e.target.attributes.name.value)
  /** When the mouse leaves a layer. */
  const onMouseLeave = () => setHovered(null)
  /** When a layer gains focus. */
  const onFocus = e => setFocused(e.target.attributes.name.value)

  /** When a layer looses focus. */
  const onBlur = () => setFocused(null)

  /** When a layer is clicked. */
  const onClick = e => {
    setClicked(e.target.attributes.name.value)
  }
  const layerProps = {
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onClick,
  }

  return (
    <>
      <div>{JSON.stringify(dataIndex[clicked])}</div>
      <p>
        <strong>Hovered layer:</strong> {hovered}
      </p>
      <p>
        <strong>Hovered layer:</strong> {focused}
      </p>
      <p>
        <strong>Clicked layer:</strong> {clicked}
      </p>
      <VectorMap {...world} layerProps={layerProps} />
    </>
  )
}

export default Map
