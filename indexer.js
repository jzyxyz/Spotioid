const fs = require('fs')
const _ = require('lodash')

const dataIndex = {}
const allFeatures = []
fs.readdirSync('data').forEach(fn => {
  const json = JSON.parse(fs.readFileSync(`./data/${fn}`))
  json.idx = parseInt(json.idx)
  allFeatures.push(json.features)
  dataIndex[json['name']] = json
})

// calculate the average
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

dataIndex.timeStamp = new Date().toDateString()

fs.writeFileSync(
  './src/dataIndex/featureRank.js',
  `export default ${JSON.stringify(featureRankIndex)}`,
)

fs.writeFileSync(
  './src/dataIndex/average.js',
  `export default ${JSON.stringify(avgIdx)}`,
)

fs.writeFileSync(
  './src/dataIndex/index.js',
  `export default ${JSON.stringify(dataIndex)}`,
)
