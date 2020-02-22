import axios from 'axios'
import { TIMETABLE_OF_NEAREST } from './query'

const API_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'

/**
 * Check longitude and latitude of the given address
 * @param {*} address the address from which we want to leave
 */
const _getLocation = async address => {
  const addressInfo = await axios.get(
    `https://api.digitransit.fi/geocoding/v1/search?text=${address}&layers=address&size=1`)
  const coordinates = addressInfo.data.features[0].geometry.coordinates
  return { lon: coordinates[0], lat:coordinates[1] }
}

/**
 * convert unix time into utc
 * @param {*} unixTime the unix time stamp
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
const _formatResult = res => {
  return res.map(node => node.node)
    .filter(node => node.place.stoptimes.length!==0)
    .map(node => {
      let option = {}
      option.stop = node.place.stop.name
      option.distance = node.distance
      const stoptime = node.place.stoptimes[0]
      const departureTime = stoptime.realtimeDeparture+stoptime.serviceDay
      option.leaves = _formatTime(departureTime)
      option.route = node.place.stoptimes[0].trip.route.shortName
      option.mode = node.place.stoptimes[0].trip.route.mode
      option.destination = node.place.stoptimes[0].headsign
      return option
    })
}

/**
 * Get time table of the stops near the address
 * @param {*} address
 */
const getTimeTable = async (address, timeRange=1) => {
  const { lat, lon } = await _getLocation(address)
  const res = await axios.post(API_URL, {
    query: TIMETABLE_OF_NEAREST,
    variables: { lat,lon,timeRange: timeRange*3600 }
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let timetable = res.data.data.nearest.edges
  timetable = _formatResult(timetable)
  return timetable
}

export default {
  getTimeTable
}
