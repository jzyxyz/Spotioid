const fs = require('fs')

let world = fs.readFileSync('world.json')
world = JSON.parse(world.toString())

const markSpotify = () => {
  const available = require('./SpotifyAvailability')
  const top = require('./country_top_50')
  let set = new Set(available)
  world.layers.forEach(element => {
    if (set.has(element.name)) {
      element.available = 'true'
    } else {
      element.available = 'false'
    }
  })

  set = new Set(Object.values(top).map(el => el.name))
  const topDict = top.reduce((acc, cur) => {
    acc[cur.name] = cur.id
    return acc
  }, {})
  // console.log(set)
  world.layers.forEach(el => {
    if (set.has(el.name)) {
      // console.log(el.name)
      el.has_top_chart = 'true'
      el.top_chart_id = topDict[el.name]
    } else {
      el.has_top_chart = 'false'
    }
  })

  fs.writeFileSync('./src/spotify_world.json', JSON.stringify(world))
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

markSpotify()
