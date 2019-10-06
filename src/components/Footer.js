import React from 'react'
import { Link } from 'react-router-dom'
import { writeToClipboard } from '../utils'
import {
  faInfo,
  faBookOpen,
  faCopyright,
  faShare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    icon: faCopyright,
    props: {},
  },
  {
    to: undefined,
    icon: faShare,
    props: {
      onClick: async () => {
        try {
          await writeToClipboard(
            `An interesting website that visualizes Spotify data ${window.location}`,
          )
        } catch (e) {
          alert(e)
        }
      },
    },
  },
]

export default () => {
  const Icons = () => (
    <div className='foot-icon-group'>
      {icons.map(({ to, icon, props }) =>
        to ? (
          <Link to={to}>
            <div className='svg-container'>
              <FontAwesomeIcon icon={icon} {...props} />
            </div>
          </Link>
        ) : (
          <div className='svg-container'>
            <FontAwesomeIcon icon={icon} {...props} />
          </div>
        ),
      )}
    </div>
  )
  return (
    <div className='foot'>
      <Icons />
    </div>
  )
}
