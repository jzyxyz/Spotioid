import React, { useState } from 'react'
import dataIndex from '../dataIndex/index'
import featureRank from '../dataIndex/featureRank'
import { flag } from 'country-emoji'
import { capitalize } from 'lodash'

const attachFlag = name => (flag(name) ? `${name} ${flag(name)}` : name)
const SpotifyLink = ({ children, country }) => (
  <a href={`https://open.spotify.com/playlist/${dataIndex[country].id}`}>
    {children}
  </a>
)

const FeatureRank = () => (
  <>
    {Object.keys(featureRank).map(f => {
      const first = featureRank[f][0]['name']
      return (
        <div key={`${f}-rank`} className='rank-key' id={`key-${f}`}>
          <h3>{capitalize(f)}</h3>
          <p>
            The region tops in this category is:
            <SpotifyLink country={first}>
              <span>
                <strong>{` ${attachFlag(first)}`}</strong>
              </span>
            </SpotifyLink>
          </p>
          <p>
            followed by
            <span id='runners-up'>
              {featureRank[f].slice(1, 5).map(({ name }) => (
                <>
                  <SpotifyLink country={name} key={name}>
                    <span>{attachFlag(name)}</span>
                  </SpotifyLink>
                  <span>{` `}</span>
                </>
              ))}
            </span>
          </p>
        </div>
      )
    })}
  </>
)

export default () => {
  return (
    <div id='report-page-root'>
      <div id='report-container'>
        <h1>DataBot for Spotify's Weekly Report</h1>
        <h5 className='timestamp'>{dataIndex.timeStamp}</h5>
        <section>
          <h2>Audio Features</h2>
          <FeatureRank />
        </section>
      </div>
    </div>
  )
}
