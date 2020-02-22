import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Dropdown } from 'semantic-ui-react'
import service from '../Services/Service'
import Option from './Option'

const Timetable = ({ address }) => {
  const [timetable, setTimetable] = useState([])
  const [timeRange, setTimeRange] = useState(1)

  const fetchTimeTable = async() => {
    const timetable = await service.getTimeTable(address, timeRange)
    setTimetable(timetable)
  }

  useEffect(() => {
    fetchTimeTable()
    const interval = setInterval(async () => {
      fetchTimeTable()
    }, 60000)
    return () => clearInterval(interval)
  }, [timeRange])

  if(timetable.length===0){
    return (
      <div>
        No available transportation
      </div>
    )
  }

  /**
   * Create dropdown options with range from 1 to 5
   */
  const createTimeOptions = () => {
    let timeOptions = []
    for(let i=1; i<6; i++){
      timeOptions.push({
        key: i,
        text: i ===1 ? '1 hour' : `${i} hours`,
        value: i
      })
    }
    return timeOptions
  }

  const handleDropdownChange = (e, { value }) => {
    setTimeRange(value)
  }

  return (
    <div>
      <h1>Timetable of Public Transportation from Eficode Headquarter</h1>
      <div>Show transportation which will leave within <span></span>
        <Dropdown inline options={createTimeOptions()} defaultValue={1} onChange={handleDropdownChange}/>
      </div>
      <Table basic='very' celled collapsing style={{ marginLeft:'auto', marginRight:'auto', marginTop:'70px' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Route</Table.HeaderCell>
            <Table.HeaderCell>Stop</Table.HeaderCell>
            <Table.HeaderCell>Distance (m)</Table.HeaderCell>
            <Table.HeaderCell>Leaves</Table.HeaderCell>
            <Table.HeaderCell>Destination</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {timetable.map(option => (
            <Option option={option} key={`${option.route}/${option.leaves}/${option.destination}`}/>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

Timetable.propTypes = {
  address: PropTypes.string.isRequired
}
export default Timetable