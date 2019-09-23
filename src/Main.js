import React, { useState, useEffect, useRef } from 'react'
import './map.scss'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import InfoBlock from './InfoBlock'
import dataIndex from './dataIndex'
import Map from './Map'
import InputSuggest from './InputSugguest'
import { trim } from 'lodash'
import COUNTRY_NAMES from './COUNTRY_LIST'

const Main = () => {
  const inputRef = useRef(null)

  const [selected, setSelected] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const NoData = () => <div>No info for this country available</div>

  const [input, setInput] = useState('')

  useEffect(() => {
    const searchBox = document.querySelector('.search-input')
    const keyup$ = fromEvent(searchBox, 'keyup')
    keyup$.pipe().subscribe(e => {
      setInput(e.target.value)
    })
    keyup$.pipe(debounceTime(200)).subscribe(event => {
      const searchInput = trim(event.target.value)
      if (searchInput.length === 0) {
        setInput('')
        setSuggestions([])
        return
      }
      const inRegex = new RegExp(`^${searchInput.toLowerCase()}`)
      const choices = COUNTRY_NAMES.filter(c => inRegex.test(c.toLowerCase()))
      setSuggestions(choices)
      // setAllSuggestions(choices)
      if (event.keyCode === 13) {
        console.log(555, choices)
        setSelected(choices[0])
        setInput(choices[0])
        event.target.value = choices[0]
        setSuggestions([])
      }
    })
    return function cleanup() {
      searchBox.removeEventListener('keyup')
    }
  }, [])

  return (
    <>
      <div className='interactive-map'>
        {suggestions.length > 0 &&
          input.length > 0 &&
          suggestions[0].toLowerCase().indexOf(input.toLowerCase()) > -1 &&
          suggestions[0].toLowerCase() !== input.toLowerCase() && (
            <InputSuggest suggestions={suggestions.slice(0, 5)} />
          )}
        <Map
          mapProps={{
            checkedLayers: selected,
            candidateLayers: suggestions,
          }}
          layerClickHandler={e => {
            inputRef.current.value = e.target.getAttribute('name')
            setInput(e.target.getAttribute('name'))
            setSelected([e.target.getAttribute('name')])
            setSuggestions([])
          }}
        />
        <input
          type='text'
          name='search'
          className='search-input'
          ref={inputRef}
        />
      </div>
      <div className='info-page'>
        {selected && dataIndex[selected] ? (
          <InfoBlock data={[dataIndex[selected], dataIndex.average]} />
        ) : (
          <NoData />
        )}
      </div>
    </>
  )
}

export default Main
