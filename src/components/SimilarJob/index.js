import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

import './index.css'

const SimilarJob = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-list-item">
      <div className="job-item-image-container">
        <img
          className="job-company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="job-title-container">
          <h1 className="job-title-heading">{title}</h1>
          <div className="job-rating-container">
            <AiFillStar className="star-icon" />
            <p className="job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="details-description-heading">Description</h1>
      <p className="details-para">{jobDescription}</p>
      <div className="similar-location-container">
        <MdLocationOn className="location-icon" />
        <p className="job-location">{location}</p>
        <MdBusinessCenter className="intern-icon" />
        <p>{employmentType}</p>
        <p className="job-package">{packagePerAnnum}</p>
      </div>
    </li>
  )
}

export default SimilarJob
