export const TIMETABLE_OF_NEAREST = `
  query($lat: Float!, $lon: Float!, $timeRange: Int) {
    nearest(lat: $lat, lon: $lon, maxDistance: 500, filterByPlaceTypes: DEPARTURE_ROW) {
      edges {
        node {
          place {
            ...on DepartureRow {
              stop {
                name
              }
              stoptimes(timeRange: $timeRange) {
                serviceDay
                realtimeDeparture
                trip {
                  route {
                    shortName,
                    mode
                  }
                }
                headsign
              }
            }
          }
          distance
        }
      }
    }
  }
`