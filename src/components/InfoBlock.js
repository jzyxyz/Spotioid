import React from 'react'
import { range } from 'lodash'
import FeatureChart from './FeatureChart'
import GenreChart from './GenreChart'
import SpotifyLogo from './SpotifyLogo'
import { Link } from 'react-router-dom'

const NoData = () => (
  <div className='no-data-tip'>No info for this country available</div>
)

const toArray = obj =>
  Object.keys(obj).map(k => ({
    name: k,
    value: obj[k],
  }))

const InfoBlock = ({ data }) => {
  if (data.some(el => !el)) return <NoData />

  const [current, avgFeatures] = data
  const { genres, features, artists, name } = current
  const featuresArray = features.map(k => k.value)
  const avgFeaturesArray = toArray(avgFeatures).map(k => k.value)
  const percent = range(featuresArray.length).map(
    i => featuresArray[i] / avgFeaturesArray[i] - 1,
  )

  const barChartData = {
    labels: features.map(el => el.name),
    datasets: [
      {
        type: 'bar',
        label: name,
        id: 'y-axis-0',
        backgroundColor: 'rgba(192, 116, 178, 0.75)',
        data: percent.map(i => (i > 0 ? i : 0)),
      },
      {
        type: 'bar',
        label: 'average',
        id: 'y-axis-0',
        backgroundColor: 'rgba(87, 172, 203,0.75)',
        data: percent.map(i => (i < 0 ? i : 0)),
      },
    ],
  }

  const ArtistBlock = () => (
    <div className='artist-block'>
      {artists
        .slice(0, 8)
        .map(({ name, external_urls: { spotify }, count }) => (
          <a
            href={spotify}
            key={name}
            target='_blank'
            rel='noopener noreferrer'
          >
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

  return (
    <>
      {/* // 下面的内容在 一个 list里面, */}
      <FeatureChart data={barChartData} />
      {/* <Link to='/reverse-index'>
        <div className='link'>See detailed ranking</div>
      </Link> */}

      <GenreChart
        className='bubble-genre'
        data={genres.map(el => ({
          label: el.name,
          value: el.count,
        }))}
      />
      {/* // 这个是 Fixed */}
      <div className='txt-block'>
        <ArtistBlock />
      </div>
    </>
  )
}

export default InfoBlock
