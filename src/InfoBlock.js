import React, { useState, useEffect } from 'react'
import './info-block.scss'
import _ from 'lodash'
// import Chart from './FeatureChart'
import { drawFeatureChart } from './draw'

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

  // stacked bar with 2 unstacked lines - nope
  const barChartData = {
    labels: Object.keys(features),
    datasets: [
      {
        type: 'bar',
        label: name,
        id: 'y-axis-0',
        backgroundColor: 'rgba(217,83,79,0.75)',
        data: percent.map(i => (i > 0 ? i : 0)),
        // data: featuresArray,
      },
      {
        type: 'bar',
        label: 'average',
        id: 'y-axis-0',
        backgroundColor: 'rgba(92,184,92,0.75)',
        data: percent.map(i => (i < 0 ? i : 0)),
        // data: avgFeaturesArray,
      },
    ],
  }
  useEffect(() => {
    drawFeatureChart(barChartData)
  }, [current])

  const GenreBlock = () => (
    <div className='genre-block'>
      {genres.map(el => (
        <div key={el.name}>{el.name}</div>
      ))}
    </div>
  )

  const ArtistBlock = () => (
    <div className='artist-block'>
      {artists.map(el => (
        <div key={el.name}>{el.name}</div>
      ))}
    </div>
  )

  return (
    <div className='info-block'>
      <canvas id='chart'></canvas>
      <GenreBlock />
      <ArtistBlock />
    </div>
  )
}

export default InfoBlock