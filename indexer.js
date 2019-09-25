const fs = require('fs')
const _ = require('lodash')

const dataIndex = {}
const allFeatures = []
fs.readdirSync('data').forEach(fn => {
  const json = JSON.parse(fs.readFileSync(`./data/${fn}`))
  allFeatures.push(json.features)
  dataIndex[json['name']] = json
})

// const featuresArray = json.features
// json.features = Object.keys(featuresArray).map(k => ({
//   name: k,
//   value: featuresArray[k],
// }))
// allFeatures.push(featuresArray)
console.log(allFeatures[0])
const avg = allFeatures.reduce((acc, cur) => {
  const keys = Object.keys(cur)
  keys.forEach(k => {
    acc[k] = (acc[k] + cur[k]) / 2
  })
  return acc
})

dataIndex.average = {
  features: avg,
}

fs.writeFileSync(
  './src/dataIndex/index.js',
  `export default ${JSON.stringify(dataIndex)}`,
)
