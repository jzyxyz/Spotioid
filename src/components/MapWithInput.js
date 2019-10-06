import React, { useState } from 'react'
import Map from './Map'
import InputSuggest from './InputSugguest'
import { trim } from 'lodash'
import COUNTRY_NAMES from '../metadata/CountryList'

export default ({ selectHandler, selected }) => {
  const [suggestions, setSuggestions] = useState([])
  const [input, setInput] = useState('')

  return (
    <div className='interactive-map'>
      {suggestions.length > 0 &&
        input.length > 0 &&
        suggestions[0].toLowerCase().indexOf(input.toLowerCase()) > -1 &&
        suggestions[0].toLowerCase() !== input.toLowerCase() && (
          <InputSuggest suggestions={suggestions.slice(0, 5)} />
        )}
      <Map
        mapProps={{
          checkedLayers: [selected],
          candidateLayers: suggestions,
        }}
        layerClickHandler={e => {
          setInput(e.target.getAttribute('name'))
          selectHandler(e.target.getAttribute('name'))
          setSuggestions([])
        }}
      />
      <input
        type='text'
        name='search'
        className='search-input'
        autoComplete='off'
        value={input}
        onChange={e => setInput(trim(e.target.value))}
        onKeyUp={event => {
          const searchInput = event.target.value
          if (searchInput.length === 0) {
            setSuggestions([])
            return
          }
          const inRegex = new RegExp(`^${searchInput.toLowerCase()}`)
          const choices = COUNTRY_NAMES.filter(c =>
            inRegex.test(c.toLowerCase()),
          )
          setSuggestions(choices)
          if (event.keyCode === 13) {
            selectHandler(choices[0])
            setInput(choices[0])
            setSuggestions([])
          }
        }}
      />
    </div>
  )
}
