import axios from 'axios'

/**
 * Check longitude and latitude of the given address
 * @param {*} address the address from which we want to leave
 */
const getLocation = async address => {
  const addressInfo = await axios.get(
    `https://api.digitransit.fi/geocoding/v1/search?text=${address}&layers=address&size=1`)
  const coordinates = addressInfo.data.features[0].geometry.coordinates
  return { lon: coordinates[0], lat:coordinates[1] }
}

export default {
  getLocation
}
