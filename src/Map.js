import React, { useState, useEffect, useRef } from 'react'
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
  const inputRef = useRef(null)

  const onMouseEnter = e => setHovered(e.target.attributes.name.value)
  const onMouseLeave = () => setHovered(null)
  const onFocus = e => setFocused(e.target.attributes.name.value)

  const onBlur = () => setFocused(null)

  const onClick = e => {
    inputRef.current.value = e.target.attributes.name.value
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
      const searchInput = event.target.value.replace(/^\s+|\s+$/, '')
      console.log(searchInput)
      const nodes = document.querySelectorAll('.map-svg > svg > path')
      if (searchInput.length === 0) {
        nodes.forEach(n => {
          n.setAttribute('candidate', 'false')
        })
        setAutoComp([])
        return
      }
      const choices = []
      nodes.forEach(n => {
        const country = n.getAttribute('name')
        const inRegex = new RegExp(`^${searchInput.toLowerCase()}`)
        if (inRegex.test(country.toLowerCase())) {
          if (n.getAttribute('available') === 'true') {
            n.setAttribute('candidate', 'true')
            choices.push({
              name: country,
              available: true,
            })
          } else {
            choices.push({
              name: country,
              available: false,
            })
          }
          console.log(444444, country)
        } else {
          n.setAttribute('candidate', 'false')
        }
      })
      setAutoComp(choices.slice(0, 3))
      if (event.keyCode === 13) {
        // hit enter
        setClicked(choices[0].name)
        event.target.value = choices[0].name
        setAutoComp([])
        return
      }
    })
  }, [])

  const AutoCompl = () => {
    return (
      <div className='auto-compl'>
        <h5>Are you looking for...</h5>
        {autoCompl.map(({ name, available }) => (
          <div
            key={name}
            className={
              available
                ? 'auto-compl-item auto-compl-available'
                : 'auto-compl-item auto-compl-unavailable'
            }
          >{`${name}`}</div>
        ))}
      </div>
    )
  }

  const NoData = () => <div>No info for this country available</div>
  return (
    <>
      <input
        type='text'
        name='search'
        className='search-input'
        ref={inputRef}
      />
      {autoCompl.length > 0 && <AutoCompl />}
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
      {clicked && dataIndex[clicked] ? (
        <InfoBlock data={[dataIndex[clicked], dataIndex.average]} />
      ) : (
        <NoData />
      )}
    </>
  )
}

export default Map
