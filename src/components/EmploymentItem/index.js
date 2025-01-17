import {useState} from 'react'

import {withRouter} from 'react-router-dom'

import './index.css'

const EmploymentItem = props => {
  const [isChecked, setIsChecked] = useState(false)
  const {employDetails, addEmploymentList} = props
  const {employmentTypeId, label} = employDetails

  const onEmployChange = event => {
    setIsChecked(!isChecked)
    addEmploymentList(employmentTypeId, event.target.checked)
  }

  return (
    <div key={employmentTypeId}>
      <input
        onChange={onEmployChange}
        id={employmentTypeId}
        type="checkbox"
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </div>
  )
}

export default withRouter(EmploymentItem)
