import React, { useState } from 'react'
import InfoBlock from './InfoBlock'
import dataIndex from '../dataIndex/index'
import avgIndex from '../dataIndex/average'
import Footer from './Footer'
import TimeStamp from './TimeStamp'
import GoTop from './GoTop'
import MapWithInput from './MapWithInput'

const Main = () => {
  const [selected, setSelected] = useState([])
  return (
    <>
      <MapWithInput selectHandler={setSelected} selected={selected} />
      <InfoBlock data={[dataIndex[selected], avgIndex]} />
      <GoTop />
      <Footer />
      <TimeStamp date={dataIndex.timeStamp} />
    </>
  )
}

export default Main
