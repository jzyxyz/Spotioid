const fs = require('fs')

let world = fs.readFileSync('world.json')
world = JSON.parse(world.toString())

const markSpotify = () => {
  const available = require('./SpotifyAvailability')
  const set = new Set(available)
  world.layers.forEach(element => {
    if (set.has(element.name)) {
      element.available = 'true'
    } else {
      element.available = 'false'
    }
  })
  fs.writeFileSync('world_new.json', JSON.stringify(world))
}

const markVisited = () => {
  const set = new Set(require('./MyWorld'))
  world.layers.forEach(element => {
    if (set.has(element.name)) {
      element.visited = 'true'
    } else {
      element.visited = 'false'
    }
  })
  fs.writeFileSync('world_visited.json', JSON.stringify(world))
}
