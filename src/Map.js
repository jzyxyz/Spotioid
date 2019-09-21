import React, { useState, useEffect } from 'react'
import VectorMap from '@south-paw/react-vector-maps'
import world from './spotify_world.json'
import './map.scss'
import './info-block.scss'
import _ from 'lodash'
// import Chart from './FeatureChart'
import fn from './test'

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
    fn(barChartData)
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
const Map = ({ dataIndex }) => {
  const [clicked, setClicked] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const onMouseEnter = e => setHovered(e.target.attributes.name.value)
  /** When the mouse leaves a layer. */
  const onMouseLeave = () => setHovered(null)
  /** When a layer gains focus. */
  const onFocus = e => setFocused(e.target.attributes.name.value)

  /** When a layer looses focus. */
  const onBlur = () => setFocused(null)

  /** When a layer is clicked. */
  const onClick = e => {
    setClicked(e.target.attributes.name.value)
  }
  const layerProps = {
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onClick,
  }

  return (
    <>
      {clicked && <InfoBlock data={[dataIndex[clicked], dataIndex.average]} />}
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
    </>
  )
}

export default Map
