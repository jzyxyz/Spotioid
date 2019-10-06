import { async } from 'q'

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
  if (result.state == 'granted' || result.state == 'prompt') {
    return navigator.clipboard.writeText(data)
  }
}

export { scrollToTop, writeToClipboard }
