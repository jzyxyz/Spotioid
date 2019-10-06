import { useEffect } from 'react'
import { debounce } from 'lodash'

const useWheel = (wheelHandler, debounceTime = 100) => {
  useEffect(() => {
    window.onwheel = debounce(wheelHandler, debounceTime)
    return window.removeEventListener('wheel', wheelHandler)
  })
}

export { useWheel }
