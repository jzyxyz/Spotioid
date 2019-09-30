import React, {useState} from 'react'

const Footer = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={'footer ' + (expanded ? 'footer-open' : '')}>
      crafted by
      <a className='footer-contact' href='mailto:nanomalloc@gmail.com'>
        @JinZhongyuan
      </a>
      <a className='footer-contact' href='mailto:yyaomingm@gmail.com'>
        @GnimOay
      </a>
    </div>
  )
}

export default Footer
