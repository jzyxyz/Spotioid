import React, { useState } from 'react'
import dataIndex from '../dataIndex/index'
import AvgIndex from '../dataIndex/average'
import featureRank from '../dataIndex/featureRank'
import featureLegend from '../dataIndex/featureLegend'
import { range, capitalize } from 'lodash'
import { Link } from 'react-router-dom'

const match = arr1 => arr2 => {
  return range(arr1.length).every(i => arr1[i] === arr2[i])
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

function RankItem({ feature, data, legend }) {
  const [showAll, setShowAll] = useState(false)
  const [des, setDes] = useState(true)

  let dataToShow

  const modeMatch = match([showAll, des])
  if (modeMatch([false, false])) {
    dataToShow = data.reverse().slice(0, 10)
  } else if (modeMatch([true, false])) {
    dataToShow = data.reverse()
  } else if (modeMatch([false, true])) {
    dataToShow = data.slice(0, 10)
  } else {
    dataToShow = data
  }

  const avgValue = AvgIndex[feature]
  const CountryItems = () => (
    <div>
      {dataToShow.map(({ name, value }) => (
        <div key={name}>
          <a href={`https://open.spotify.com/playlist/${dataIndex[name].id}`}>
            {name}
          </a>
          <div>{value.toFixed(3)}</div>
          <div>
            {value > avgValue
              ? `${((value / avgValue - 1) * 100).toFixed(
                  0,
                )}% higher than average`
              : `${((1 - value / avgValue) * 100).toFixed(
                  0,
                )}% lower than average`}
          </div>
        </div>
      ))}
      <div>
        <Button
          onClick={() => {
            setShowAll(!showAll)
          }}
          text={showAll ? 'Show Top 10' : 'Show All'}
        />
        <Button
          onClick={() => {
            setDes(!des)
          }}
          text={des ? 'Ascending' : 'Descending'}
        />
      </div>
    </div>
  )

  return (
    <div className='rank-item' id={`feature-rank`}>
      <div className='header'>{capitalize(feature)}</div>
      <div className='legend'>{legend} </div>
      <CountryItems />
    </div>
  )
}

const F_KEYS = Object.keys(featureLegend)

export default () => {
  return (
    <div>
      <Link to='/'>Homepage</Link>
      {F_KEYS.map(el => (
        <RankItem
          key={el}
          feature={el}
          data={featureRank[el]}
          legend={featureLegend[el]}
        />
      ))}
    </div>
  )
}
