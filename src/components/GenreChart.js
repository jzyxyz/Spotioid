import React from 'react'
import BubbleChart from './BubbleChart'

const GenreChart = ({data, className}) => {
  console.log(data)
  const bubbleClick = label => {
    console.log('Custom bubble click func')
  }

  return (
    <BubbleChart
      className={className}
      graph={{
        zoom: 0.7,
        offsetX: -0.05,
        offsetY: -0.01,
      }}
      heigth={400}
      width={400}
      padding={0} // optional value, number that set the padding between bubbles
      showLegend={false} // optional value, pass false to disable the legend.
      bubbleClickFunc={bubbleClick}
      data={data}
    />
  )
}

export default GenreChart
