import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Chart from './FeatureChart'
import GenreChart from './GenreChart'

const InfoBlock = ({ data }) => {
  const [current, average] = data

  const { genres, features, artists, name } = current
  const { features: avgFeatures } = average
  const toArray = obj =>
    Object.keys(obj).map(k => ({
      name: k,
      value: obj[k],
    }))

  const featuresArray = toArray(features).map(k => k.value)
  const avgFeaturesArray = toArray(avgFeatures).map(k => k.value)
  const percent = _.range(featuresArray.length).map(
    i => featuresArray[i] / avgFeaturesArray[i] - 1,
  )

  const barChartData = {
    labels: Object.keys(features),
    datasets: [
      {
        type: 'bar',
        label: name,
        id: 'y-axis-0',
        backgroundColor: 'rgba(217,83,79,0.75)',
        data: percent.map(i => (i > 0 ? i : 0)),
      },
      {
        type: 'bar',
        label: 'average',
        id: 'y-axis-0',
        backgroundColor: 'rgba(92,184,92,0.75)',
        data: percent.map(i => (i < 0 ? i : 0)),
      },
    ],
  }

  const GenreBlock = () => (
    <div className='genre-block'>
      {genres.map(el => (
        <div key={el.name}>{el.name}</div>
      ))}
    </div>
  )

  const ArtistBlock = () => (
    <div className='artist-block'>
      {artists
        .slice(0, 8)
        .map(({ name, external_urls: { spotify }, count }) => (
          <div key={name}>
            <a href={spotify}>
              <div>{name}</div>
              <div>{count}</div>
            </a>
          </div>
        ))}
    </div>
  )

  return (
    <div className='info-block'>
      <GenreChart
        data={genres.map(el => ({
          label: el.name,
          value: el.count,
        }))}
      />
      <Chart data={barChartData} />
      <div className='txt-block'>
        <GenreBlock />
        <ArtistBlock />
      </div>
    </div>
  )
}

export default InfoBlock
