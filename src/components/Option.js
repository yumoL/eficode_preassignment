import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

const Option = ({ option }) => {
  return (
    <Table.Row >
      <Table.Cell>
        <h4>{option.route} <span>({`${option.mode.toLowerCase()}`})</span></h4>
      </Table.Cell>
      <Table.Cell>
        {option.stop}
      </Table.Cell>
      <Table.Cell>
        {option.distance}
      </Table.Cell>
      <Table.Cell>
        {option.leaves}
      </Table.Cell>
      <Table.Cell>
        {option.destination}
      </Table.Cell>
    </Table.Row>
  )
}

Option.propTypes = {
  option: PropTypes.object.isRequired
}

export default Option