import React, { useState, useEffect } from 'react'
import VectorMap from '@south-paw/react-vector-maps'
import world from './spotify_world.json'
import './map.scss'
// RxJS v6+
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import InfoBlock from './InfoBlock'

const Map = ({ dataIndex }) => {
  const [clicked, setClicked] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const [autoCompl, setAutoComp] = useState([])

  const onMouseEnter = e => setHovered(e.target.attributes.name.value)
  const onMouseLeave = () => setHovered(null)
  const onFocus = e => setFocused(e.target.attributes.name.value)

  const onBlur = () => setFocused(null)

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

  useEffect(() => {
    const searchBox = document.querySelector('.search-input')
    const keyup$ = fromEvent(searchBox, 'keyup')
    keyup$.pipe(debounceTime(200)).subscribe(event => {
      console.log(event)
      const searchInput = event.target.value.replace(/\s+/, '')
      console.log(searchInput)
      const nodes = document.querySelectorAll('.map-svg > svg > path')
      if (searchInput.length === 0) {
        nodes.forEach(n => {
          n.setAttribute('candidate', 'false')
        })
        return
      }
      const choices = []
      nodes.forEach(n => {
        const country = n.getAttribute('name')
        const inRegex = new RegExp(`^${searchInput.toLowerCase()}`)
        if (
          inRegex.test(country.toLowerCase()) &&
          n.getAttribute('available') === 'true'
        ) {
          n.setAttribute('candidate', 'true')
          console.log(444444, country)
          choices.push(country)
        } else {
          n.setAttribute('candidate', 'false')
        }
      })
      setAutoComp(choices)
      if (event.keyCode === 13) {
        // hit enter
        setClicked(choices[0])
        return
      }
    })
  }, [])

  const AutoCompl = () => {
    return autoCompl.map(el => <div>{el}</div>)
  }

  return (
    <>
      <input type='text' name='search' className='search-input' />
      <AutoCompl />
      <div></div>
      <p>
        <strong>Hovered layer:</strong> {hovered}
      </p>
      <p>
        <strong>Hovered layer:</strong> {focused}
      </p>
      <p>
        <strong>Clicked layer:</strong> {clicked}
      </p>
      <div className='map-svg'>
        <VectorMap {...world} layerProps={layerProps} />
      </div>
      {clicked && <InfoBlock data={[dataIndex[clicked], dataIndex.average]} />}
    </>
  )
}

export default Map
