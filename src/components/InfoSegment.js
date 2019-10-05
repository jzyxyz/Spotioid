import React, { useEffect, useState } from 'react'
import { range } from 'lodash'
import FeatureChart from './FeatureChart'
import SpotifyLogo from './SpotifyLogo'
import BubbleChart from './BubbleChart'

import { debounceTime } from 'rxjs/operators'
import { fromEvent } from 'rxjs'

const toArray = obj =>
  Object.keys(obj).map(k => ({
    name: k,
    value: obj[k],
  }))

const ChartContainer = ({ children, title }) => (
  <div className='chart-container'>
    <div className='chart-title'>
      <h2>{title}</h2>
    </div>
    <div className='chart'>{children}</div>
  </div>
)

const WheelWrapper = ({ wheelHandler, children }) => {
  useEffect(() => {
    const scroll$ = fromEvent(window, 'wheel')
    scroll$.pipe(debounceTime(200)).subscribe(wheelHandler)
    return window.removeEventListener('wheel', wheelHandler)
  })
  return children
}

export default React.forwardRef(({ data }, ref) => {
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
    <div className='artists'>
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
    <WheelWrapper
      wheelHandler={() => {
        if (ref.current) {
        }
      }}
    >
      <div ref={ref} id='info-segment'>
        <ChartContainer title='Top Genres'>
          <BubbleChart
            className='bubble'
            data={genres.map(el => ({
              label: el.name,
              value: el.count,
            }))}
            graph={{
              zoom: 1,
            }}
            height={400}
            width={400}
            padding={5} // optional value, number that set the padding between bubbles
            showLegend={false} // optional value, pass false to disable the legend.
          />
        </ChartContainer>
        <ChartContainer title='Top Artists'>
          <ArtistBlock />
        </ChartContainer>
        <ChartContainer title='Audio Features'>
          <FeatureChart
            data={barChartData}
            canvasStyle={{
              height: 400,
              width: 700,
            }}
          />
        </ChartContainer>
      </div>
    </WheelWrapper>
  )
})
