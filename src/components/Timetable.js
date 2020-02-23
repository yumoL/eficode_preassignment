import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Table, Message } from 'semantic-ui-react'
import { TIMETABLE_OF_NEAREST } from '../query'
import service from '../service'
import Option from './Option'
import { formatResult } from '../util'

const Timetable = ({ address }) => {
  const [lon, setLon] = useState(0)
  const [lat, setLat] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // get longitude and latitude of the address
    const getCoordinates = async() => {
      const { lon,lat }= await service.getLocation(address)
      setLon(lon)
      setLat(lat)
    }
    getCoordinates()
  },[address])

  return (
    <Query query={TIMETABLE_OF_NEAREST} variables={{ lon, lat }} pollInterval={60000}>
      {({ loading, error, data }) => {
        if(loading) return null
        if(error) return (
          <p>Something wrong happened... {error}</p>
        )
        return (
          <div>
            <h1>Timetable of Public Transportation from Eficode Headquarter</h1>
            {visible&&
            <Message onDismiss={() => setVisible(false)} id='infoMessage'>
              This info screen is showing lines which will leave in a short time
            </Message>}
            <Table id='timeTable' basic='very' celled collapsing style={{ marginLeft:'auto', marginRight:'auto', marginTop:'70px' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Line</Table.HeaderCell>
                  <Table.HeaderCell>Stop</Table.HeaderCell>
                  <Table.HeaderCell>Distance (m) to the stop</Table.HeaderCell>
                  <Table.HeaderCell>Leaves</Table.HeaderCell>
                  <Table.HeaderCell>Destination</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {formatResult(data.nearest.edges).map(option => (
                  <Option option={option} key={`${option.line}/${option.leaves}/${option.destination}`}/>
                ))}
              </Table.Body>
            </Table>
          </div>
        )

      }}
    </Query>
  )
}

Timetable.propTypes = {
  address: PropTypes.string.isRequired
}
export default Timetable