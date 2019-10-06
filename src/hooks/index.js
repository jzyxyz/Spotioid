import { useEffect } from 'react'
import { debounce, throttle } from 'lodash'

const useWheel = (wheelHandler, debounceTime = 50) => {
  useEffect(() => {
    const handler = debounce(wheelHandler, debounceTime)
    window.onwheel = handler
    return window.removeEventListener('wheel', handler)
  })
}

const useKeyDown = (keyDownHandler, throttleTime = 0) => {
  useEffect(() => {
    const handler = throttle(keyDownHandler, throttleTime)
    window.onkeydown = handler
    return window.removeEventListener('keydown', handler)
  })
}

export { useWheel, useKeyDown }
