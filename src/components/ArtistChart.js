import React from 'react'
import SpotifyLogo from './SpotifyLogo'

export default ({ artistsData }) => (
  <div className='artists'>
    {artistsData
      .slice(0, 8)
      .map(({ name, external_urls: { spotify }, count }) => (
        <a href={spotify} key={name} target='_blank' rel='noopener noreferrer'>
          <div className='singer-name'>{name}</div>
          <div className='count-block'>
            <div className='count-bar' style={{ width: count * 7 }}></div>
            <div className='song-count'>{count}</div>
          </div>
          <SpotifyLogo />
        </a>
      ))}
  </div>
)
