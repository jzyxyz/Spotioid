import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import Main from './components/Main'
import Typography from 'typography'
import theme from 'typography-theme-fairy-gates'
import injectFonts from './injectFonts'

theme.baseFontSize = '17px'
const typography = new Typography(theme)

typography.injectStyles()
injectFonts(typography)

ReactDOM.render(<Main />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
