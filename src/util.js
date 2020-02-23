/**
 * Convert unix time into utc
 * @param {*} unixTime unix timestmap
 */
const _convertUnixToUtc = unixTime => {
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(unixTime * 1000)
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  return hours + ':' + minutes.substr(-2)
}

/**
 * If difference betwee current time and departure time is less than 1h, show the difference in minutes.
 * Otherwise show departure time directly
 * @param {*} departureTime departure time of a line
 */
const _formatTime = (departureTime) => {
  const unixTimeDiff = departureTime-new Date().getTime()/1000
  if(unixTimeDiff/60<60){
    return Math.floor(unixTimeDiff/60)+' min'
  }
  return _convertUnixToUtc(departureTime)
}

/**
 * Format the result of the request
 */
export const formatResult = res => {
  return res.map(node => node.node)
    .filter(node => node.place.stoptimes.length!==0)
    .map(node => {
      let option = {}
      option.stop = node.place.stop.name
      option.distance = node.distance
      const stoptime = node.place.stoptimes[0]
      const departureTime = stoptime.realtimeDeparture+stoptime.serviceDay
      option.leaves = _formatTime(departureTime)
      option.line = node.place.stoptimes[0].trip.route.shortName
      option.mode = node.place.stoptimes[0].trip.route.mode
      option.destination = node.place.stoptimes[0].headsign
      return option
    })
}
