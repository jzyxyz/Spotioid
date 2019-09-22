import React, { PureComponent } from 'react'

import VectorMap from './VectorMap'
import world from './spotify_world.json'
import './map.scss'

const Tooltip = ({ style, text }) => (
  <div className='tooltip' style={style}>
    {text}
  </div>
)

class Map extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      current: null,
      isTooltipVisible: false,
      tooltipY: 0,
      tooltipX: 0,
    }
  }

  onMouseOver = e => {
    this.setState({ current: e.target.attributes.name.value })
  }

  onMouseMove = e =>
    this.setState({
      isTooltipVisible: true,
      tooltipY: e.clientY + 10,
      tooltipX: e.clientX + 10,
    })

  onMouseOut = () => this.setState({ current: null, isTooltipVisible: false })

  render() {
    const { current, isTooltipVisible, tooltipX, tooltipY } = this.state
    const { mapProps, layerClickHandler } = this.props
    const layerProps = {
      onMouseOver: this.onMouseOver,
      onMouseMove: this.onMouseMove,
      onMouseOut: this.onMouseOut,
      onClick: layerClickHandler,
    }

    const tooltipStyle = {
      display: isTooltipVisible ? 'block' : 'none',
      top: tooltipY,
      left: tooltipX,
    }

    return (
      <>
        <VectorMap
          {...world}
          layerProps={layerProps}
          {...mapProps}
          className='map-svg'
        />
        <Tooltip style={tooltipStyle} text={current} />
      </>
    )
  }
}

export default Map
