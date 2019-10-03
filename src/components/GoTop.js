import React from 'react'

export default () => (
  <>
    <div
      className='click-scroll'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Top
    </div>
    <div
      className='click-scroll-down'
      onClick={() => {
        window.scrollBy({
          top: window.outerHeight * 0.65,
          behavior: 'smooth',
        })
      }}
    >
      Next
    </div>
  </>
)
