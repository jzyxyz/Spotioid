import React, { PureComponent } from 'react'
import VectorMap from '@south-paw/react-vector-maps'
import world from './spotify_world.json'
import './map.scss'
class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hovered: null,
      focused: null,
      clicked: null,
    }
  }

  /** When the mouse enters a layer. */
  onMouseEnter = e => this.setState({ hovered: e.target.attributes.name.value })

  /** When the mouse leaves a layer. */
  onMouseLeave = () => this.setState({ hovered: null })

  /** When a layer gains focus. */
  onFocus = e => this.setState({ focused: e.target.attributes.name.value })

  /** When a layer looses focus. */
  onBlur = () => this.setState({ focused: null })

  /** When a layer is clicked. */
  onClick = e => {
    this.setState({ clicked: e.target.attributes.name.value })
  }

  render() {
    const { hovered, focused, clicked } = this.state

    const layerProps = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onClick: this.onClick,
    }

    return (
      <>
        <p>
          <strong>Hovered layer:</strong> {hovered}
        </p>
        <p>
          <strong>Focused layer:</strong> {focused}
        </p>
        <p>
          <strong>Clicked layer:</strong> {clicked}
        </p>
        <VectorMap {...world} layerProps={layerProps} />
      </>
    )
  }
}

export default App
