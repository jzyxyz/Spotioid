import React, { useEffect } from 'react'
import dataIndex from '../dataIndex/index'
import featureRank from '../dataIndex/featureRank'
import artistRank from '../dataIndex/artistRank.json'
import { flag } from 'country-emoji'
import { capitalize } from 'lodash'
import { scrollToTop } from '../utils/index.js'
import { Link } from 'react-router-dom'
import SpotifyLink from './SpotifyLink'

const attachFlag = name => (flag(name) ? `${name} ${flag(name)}` : name)

const FeatureRank = () => (
  <>
    {Object.keys(featureRank).map(f => {
      const first = featureRank[f][0]['name']
      return (
        <div key={`${f}-rank`} className='rank-key' id={`key-${f}`}>
          <h4>{capitalize(f)}</h4>
          <p>
            The region tops in this category is:
            <SpotifyLink id={dataIndex[first].id} prefix='playlist'>
              <span>
                <strong>{` ${attachFlag(first)}`}</strong>
              </span>
            </SpotifyLink>
          </p>
          <p>
            followed by
            <span id='runners-up'>
              {featureRank[f].slice(1, 5).map(({ name }) => (
                <div key={name}>
                  <SpotifyLink id={dataIndex[name].id} prefix='playlist'>
                    <span>{attachFlag(name)}</span>
                  </SpotifyLink>
                </div>
              ))}
            </span>
          </p>
        </div>
      )
    })}
  </>
)

const ArtistRank = () => {
  const Top5 = () => {
    const base = artistRank[5].count
    const Top = ({ id, name, regionCount, count }) => (
      <>
        <SpotifyLink prefix='artist' id={id}>
          <h4
            className='artist-name'
            style={{
              width: `${((550 * count) / base - 400).toFixed(0)}px`,
            }}
          >
            {name}
          </h4>
        </SpotifyLink>
        <p>
          <span>
            appears in
            <span className='artist-region-count'> {regionCount}</span> regions
            with total count of{'   '}
            <span className='artist-total-count'>{count}</span>
          </span>
        </p>
      </>
    )
    return artistRank.slice(0, 5).map(a => <Top {...a} key={a.name} />)
  }

  return <Top5 />
}

const Section = ({ children, title }) => {
  return (
    <section className={`${title.toLowerCase()}-section`}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default () => {
  useEffect(scrollToTop, [])

  return (
    <div id='report-page-root'>
      <Link to='/'>
        <div className='to-home-btn'></div>
      </Link>
      <div id='report-container'>
        <article>
          <h1>DataBot for Spotify's Weekly Report</h1>
          <h5 className='timestamp'>{dataIndex.timeStamp}</h5>
          <Section title='Audio Features'>
            <FeatureRank />
          </Section>
          <Section title='Artists'>
            <ArtistRank />
          </Section>
        </article>
      </div>
    </div>
  )
}
