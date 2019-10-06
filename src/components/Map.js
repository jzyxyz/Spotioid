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
    }
  }

  onMouseOver = e => {
    this.setState({ current: e.target.attributes.name.value })
  }
  onMouseMove = e =>
    this.setState({
      isTooltipVisible: true,
    })

  onMouseOut = () => this.setState({ current: null, isTooltipVisible: false })

  render() {
    const { current, isTooltipVisible } = this.state
    const { mapProps, layerClickHandler } = this.props
    const layerProps = {
      onMouseOver: this.onMouseOver,
      onMouseMove: this.onMouseMove,
      onMouseOut: this.onMouseOut,
      onClick: layerClickHandler,
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
