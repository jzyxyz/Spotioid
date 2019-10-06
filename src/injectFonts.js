function injectFonts(typography) {
  let fontsStr = ''
  if (typography.options.googleFonts) {
    const fonts = typography.options.googleFonts.map(font => {
      let str = ''
      str += font.name.split(' ').join('+')
      str += ':'
      str += font.styles.join(',')

      return str
    })

    fontsStr = fonts.join('|')
  }
  if (fontsStr) {
    const link = `<link href="https://fonts.googleapis.com/css?family=${fontsStr}&display=swap" rel="stylesheet" type="text/css" />`
    injectLink(link)
  } else {
    throw new Error('no fonts str')
  }
}

function injectLink(link) {
  const typoElt = document.getElementById('typography.js')
  if (typoElt) {
    typoElt.insertAdjacentHTML('afterend', link)
  }
}

export default injectFonts
