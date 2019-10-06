import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { writeToClipboard, animateInThenOut } from '../utils'
import {
  faInfo,
  faBookOpen,
  faCopyright,
  faShare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {
  const shareTipRef = useRef(null)
  const copyrightRef = useRef(null)

  const icons = [
    {
      to: '/about',
      icon: faInfo,
      props: {},
    },
    {
      to: '/report',
      icon: faBookOpen,
      props: {},
    },
    {
      to: undefined,
      icon: faShare,
      props: {
        onClick: async () => {
          try {
            await writeToClipboard(
              `Checkout this interesting website that visualizes Spotify data ${window.location}`,
            )
            animateInThenOut(shareTipRef)
          } catch (e) {
            alert(e)
          }
        },
      },
    },
    {
      to: undefined,
      icon: faCopyright,
      id: '#copyright',
      props: {
        onMouseEnter: () => {
          animateInThenOut(copyrightRef, 'zoomIn', false)
        },
      },
    },
  ]

  const Icons = () => (
    <div className='foot-icon-group'>
      {icons.map(({ to, icon, props }, idx) =>
        to ? (
          <Link to={to} key={idx}>
            <div className='svg-container'>
              <FontAwesomeIcon icon={icon} {...props} />
            </div>
          </Link>
        ) : (
          <div className='svg-container' key={idx}>
            <FontAwesomeIcon icon={icon} {...props} />
          </div>
        ),
      )}
    </div>
  )

  return (
    <div className='foot'>
      <Icons />
      <div id='share-tip' className='hidden' ref={shareTipRef}>
        Copied website link to clipboard! 😄
      </div>
      <div
        id='copyright-tip'
        className='hidden'
        ref={copyrightRef}
        onMouseLeave={() => {
          copyrightRef.current.classList.add('hidden')
        }}
      >
        <a href='https://jzyis.me/about'>
          <div>@JinZhongyuan</div>
        </a>
        <a href='mailto:yyaomingm@gmail.com'>
          <div>@GnimOay</div>
        </a>
      </div>
    </div>
  )
}
