const fs = require('fs')
const _ = require('lodash')

const txt = fs.readFileSync('./world.json').toString()
const json = JSON.parse(txt)

const list = json.layers.map(l => l.name)
fs.writeFileSync('./src/COUNTRY_LIST.js', JSON.stringify(list))
