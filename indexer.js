const fs = require('fs')

const dataIndex = {}

fs.readdirSync('./data').forEach(fn => {
  const json = JSON.parse(fs.readFileSync(`./data/${fn}`))
  dataIndex[json['name']] = json
})

fs.writeFileSync('./src/dataIndex.js', JSON.stringify(dataIndex))
