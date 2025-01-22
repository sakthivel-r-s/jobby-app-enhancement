import {useState} from 'react'

import {withRouter} from 'react-router-dom'

import './index.css'

const SalaryItem = props => {
  const {salaryDetails, addSalaryList} = props
  const {salaryRangeId, label} = salaryDetails

  const onSalaryChange = event => {
    addSalaryList(event.target.value)
  }

  return (
    <div key={salaryRangeId}>
      <input
        onChange={onSalaryChange}
        value={salaryRangeId}
        id={salaryRangeId}
        type="radio"
        name="salary"
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </div>
  )
}

export default withRouter(SalaryItem)
