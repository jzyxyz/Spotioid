import React from 'react'
import { range } from 'lodash'
import FeatureChart from './FeatureChart'
import BubbleChart from './BubbleChart'
import ArtistChart from './ArtistChart'

const genreChartDimension = {
  width: 700,
  height: 600,
}
const featureChartDimension = {
  canvasStyle: {
    width: 900,
    height: 600,
  },
}

const toArray = obj =>
  Object.keys(obj).map(k => ({
    name: k,
    value: obj[k],
  }))

const ChartContainer = React.forwardRef(({ children, title }, ref) => (
  <div className='chart-container' ref={ref}>
    <div className='chart-title'>
      <h2>{title}</h2>
    </div>
    <div className='chart'>{children}</div>
  </div>
))

export default React.forwardRef(({ data }, ref) => {
  const [current, avgFeatures] = data
  const { genres, features, artists, name } = current
  const featuresArray = features.map(k => k.value)
  const avgFeaturesArray = toArray(avgFeatures).map(k => k.value)
  const percent = range(featuresArray.length).map(
    i => featuresArray[i] / avgFeaturesArray[i] - 1,
  )

  const featureChartData = {
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

  return (
    <div ref={ref} id='info-segment'>
      <ChartContainer title='Top Genres'>
        <BubbleChart
          data={genres.map(el => ({
            label: el.name,
            value: el.count,
          }))}
          graph={{
            zoom: 1,
          }}
          {...genreChartDimension}
          padding={5} // optional value, number that set the padding between bubbles
          showLegend={false} // optional value, pass false to disable the legend.
        />
      </ChartContainer>
      <ChartContainer title='Top Artists'>
        <ArtistChart artistsData={artists} />
      </ChartContainer>
      <ChartContainer title='Audio Features'>
        <FeatureChart data={featureChartData} {...featureChartDimension} />
      </ChartContainer>
    </div>
  )
})
