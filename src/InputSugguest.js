import React, { useState } from 'react'

const InputSuggest = ({ suggestions }) => {
  return suggestions.length > 0 ? (
    <div className='auto-compl'>
      {suggestions.map(el => (
        <div key={el}>{`${el}`}</div>
      ))}
    </div>
  ) : (
    <div>Not found in the database</div>
  )
}

export default InputSuggest
