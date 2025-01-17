import {Link, withRouter} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  const jobPath = `/jobs/${id}`

  return (
    <Link to={jobPath} className="job-link">
      <li className="job-list-item">
        <div className="job-item-image-container">
          <img
            className="job-company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="job-title-container">
            <h1 className="job-title-heading">{title}</h1>
            <div className="job-rating-container">
              <AiFillStar className="star-icon" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-location-container">
          <MdLocationOn className="location-icon" />
          <p className="job-location">{location}</p>
          <MdBusinessCenter className="intern-icon" />
          <p>{employmentType}</p>
          <p className="job-package">{packagePerAnnum}</p>
        </div>
        <h1 className="description-heading">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default withRouter(JobItem)
