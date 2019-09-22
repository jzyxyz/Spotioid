import React, { useState, useEffect, useRef } from 'react'
import './map.scss'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import InfoBlock from './InfoBlock'
import dataIndex from './dataIndex'
import Map from './Map'

const Main = () => {
  const inputRef = useRef(null)

  const [clicked, setClicked] = useState(null)
  const [autoCompl, setAutoComp] = useState([])
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

  useEffect(() => {
    const searchBox = document.querySelector('.search-input')
    const keyup$ = fromEvent(searchBox, 'keyup')
    keyup$.pipe(debounceTime(200)).subscribe(event => {
      console.log(event)
      const searchInput = event.target.value.replace(/^\s+|\s+$/, '')
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
        document
          .querySelectorAll(`.map-svg > svg > path[candidate='true']`)
          .forEach(n => {
            if (n.getAttribute('name') === choices[0].name) {
              console.log(666)
            } else {
              console.log(9999, n.getAttribute('name'))
              n.setAttribute('candidate', 'false')
            }
          })
      }
    })
  }, [])

  return (
    <>
      <p>
        <strong>Clicked layer:</strong> {clicked}
      </p>
      <input
        type='text'
        name='search'
        className='search-input'
        ref={inputRef}
      />
      {autoCompl.length > 0 && <AutoCompl />}{' '}
      <Map
        clickHandler={e => {
          inputRef.current.value = e.target.attributes.name.value
          setClicked(e.target.attributes.name.value)
        }}
      />
      {clicked && dataIndex[clicked] ? (
        <InfoBlock data={[dataIndex[clicked], dataIndex.average]} />
      ) : (
        <NoData />
      )}
    </>
  )
}

export default Main
