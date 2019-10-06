import { isNumber } from 'lodash'

const scrollToTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, 100)
}

const writeToClipboard = async data => {
  const result = await navigator.permissions.query({ name: 'clipboard-write' })
  if (result.state === 'granted' || result.state === 'prompt') {
    return navigator.clipboard.writeText(data)
  }
}

const animateInThenOut = (reference, method = 'fadeIn', timeout = 3000) => {
  reference.current.classList.add('animated', method)
  reference.current.classList.remove('hidden')
  if (isNumber(timeout)) {
    setTimeout(() => {
      reference.current.classList.add('hidden')
    }, timeout)
  }
}

export { scrollToTop, writeToClipboard, animateInThenOut }
