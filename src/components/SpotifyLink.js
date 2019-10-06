import React from 'react'

export default ({ children, id, prefix }) => (
  <a href={`https://open.spotify.com/${prefix}/${id}`}>{children}</a>
)
