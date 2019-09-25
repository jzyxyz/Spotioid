import React, { PureComponent } from 'react'
import VectorMap from './VectorMap'
import world from '../metadata/spotify_world.json'

const Tooltip = ({ style, text, cName }) => (
  <div className={'tooltip ' + cName || ''} style={style}>
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
        <Tooltip cName={isTooltipVisible ? 'show' : 'hide'} text={current} />
      </>
    )
  }
}

export default Map
