const fs = require('fs')
const _ = require('lodash')

const dataIndex = {}
const allFeatures = []
let allArtists = []
let allGenres = []

fs.readdirSync('data').forEach(fn => {
  const json = JSON.parse(fs.readFileSync(`./data/${fn}`))
  json.idx = parseInt(json.idx)
  allFeatures.push(json.features)
  allGenres.push(json.genres)
  allArtists.push(json.artists)
  dataIndex[json['name']] = json
})

const calAvgIndex = () => {
  const avgIdx = {}
  allFeatures
    .reduce((acc, cur) => {
      _.range(Object.keys(cur).length).map(i => {
        acc[i].value += cur[i].value
        acc[i].value /= 2
      })
      return acc
    })
    .forEach(el => {
      avgIdx[el.name] = el.value
    })

  fs.writeFileSync(
    './src/dataIndex/featureRank.js',
    `export default ${JSON.stringify(featureRankIndex)}`,
  )
}

const calFeatureIndex = () => {
  // sort the rank
  let allDataAsList = Object.values(dataIndex)
  const featureRankIndex = {}
  Object.keys(avgIdx).forEach((fk, i) => {
    const currentListByKey = allDataAsList.map(({ name, features }) => {
      return {
        name,
        value: features[i].value,
      }
    })
    featureRankIndex[fk] = _.orderBy(
      currentListByKey,
      [el => el.value],
      ['desc'],
    ).map((el, i) => ({
      ...el,
      rank: i + 1,
    }))
  })
  fs.writeFileSync(
    './src/dataIndex/average.js',
    `export default ${JSON.stringify(avgIdx)}`,
  )
}

// calculate artists
const calArtGnrIndex = array => {
  const flattened = _.flatten(array)

  const sortIndex = {}
  flattened.forEach(({ name, count, id }) => {
    if (sortIndex[name]) {
      sortIndex[name].count += 1
    } else {
      sortIndex[name] = { id, name, count }
    }
  })
  const sorted = _.orderBy(
    Object.values(sortIndex),
    [el => el.count, el => el.name],
    ['desc', 'asc'],
  ).slice(0, 20)

  sorted.forEach(top => {
    const { name } = top
    top.regionCount = array.filter(regionalList =>
      regionalList.some(a => a.name === name),
    ).length
  })

  return sorted
}

const calArtistIndex = () => {
  const data = calArtGnrIndex(allArtists)
  fs.writeFileSync('./src/dataIndex/artistRank.json', JSON.stringify(data))
}

const calGenreIndex = () => {
  const data = calArtGnrIndex(allGenres)
  fs.writeFileSync('./src/dataIndex/genresRank.json', JSON.stringify(data))
}

const writeIndex = () => {
  dataIndex.timeStamp = new Date().toDateString()
  fs.writeFileSync(
    './src/dataIndex/index.js',
    `export default ${JSON.stringify(dataIndex)}`,
  )
}

calArtistIndex()
calGenreIndex()
