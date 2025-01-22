import {useState} from 'react'

import {withRouter} from 'react-router-dom'

import './index.css'

const LocationItem = props => {
  const [isChecked, setIsChecked] = useState(false)
  const {locationDetails, addLocationList} = props
  const {locationId, label} = locationDetails

  const onLocationChange = event => {
    setIsChecked(!isChecked)
    addLocationList(locationId, event.target.checked)
  }

  return (
    <div key={locationId}>
      <input
        onChange={onLocationChange}
        id={locationId}
        type="checkbox"
        value={locationId}
      />
      <label htmlFor={locationId}>{label}</label>
    </div>
  )
}

export default withRouter(LocationItem)
