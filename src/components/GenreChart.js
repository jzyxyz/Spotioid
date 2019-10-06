import React from 'react'
import BubbleChart from './BubbleChart'

const GenreChart = ({ data, className }) => {
  return (
    <BubbleChart
      className={className}
      graph={{
        zoom: 1,
      }}
      padding={5} // optional value, number that set the padding between bubbles
      showLegend={false} // optional value, pass false to disable the legend.
      data={data}
    />
  )
}

export default GenreChart
