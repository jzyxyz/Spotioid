import React from 'react'
import BubbleChart from './BubbleChart'

const GenreChart = ({ data, className }) => {
  // console.log(data)

  return (
    <BubbleChart
      className={className}
      graph={{
        zoom: 0.5,
      }}
      heigth={800}
      width={800}
      padding={5} // optional value, number that set the padding between bubbles
      showLegend={false} // optional value, pass false to disable the legend.
      data={data}
    />
  )
}

export default GenreChart
