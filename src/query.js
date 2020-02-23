import { gql } from 'apollo-boost'

export const TIMETABLE_OF_NEAREST = gql`
  query($lat: Float!, $lon: Float!) {
    nearest(lat: $lat, lon: $lon, maxDistance: 500, filterByPlaceTypes: DEPARTURE_ROW) {
      edges {
        node {
          place {
            ...on DepartureRow {
              stop {
                name
              }
              stoptimes(timeRange:7200) {
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