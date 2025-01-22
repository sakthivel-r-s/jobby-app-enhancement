import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn, MdBusinessCenter} from 'react-icons/md'

import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJob from '../SimilarJob'

import './index.css'

const convertSkills = arr =>
  arr.map(eachItem => ({
    imageUrl: eachItem.image_url,
    name: eachItem.name,
  }))

const convertlifeAtCompany = obj => ({
  imageUrl: obj.image_url,
  description: obj.description,
})

const convertJobDetails = jobDetails => ({
  title: jobDetails.title,
  companyLogoUrl: jobDetails.company_logo_url,
  companyWebsiteUrl: jobDetails.company_website_url,
  employmentType: jobDetails.employment_type,
  id: jobDetails.id,
  jobDescription: jobDetails.job_description,
  lifeAtCompany: convertlifeAtCompany(jobDetails.life_at_company),
  location: jobDetails.location,
  packagePerAnnum: jobDetails.package_per_annum,
  rating: jobDetails.rating,
  skills: convertSkills(jobDetails.skills),
})

const convertSimilarJobs = similarJobs =>
  similarJobs.map(eachItem => ({
    companyLogoUrl: eachItem.company_logo_url,
    employmentType: eachItem.employment_type,
    id: eachItem.id,
    jobDescription: eachItem.job_description,
    location: eachItem.location,
    packagePerAnnum: eachItem.package_per_annum,
    rating: eachItem.rating,
    title: eachItem.title,
  }))

const fetchStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobData: {}, jobDetailsStatus: fetchStatus.loading}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        jobDetails: convertJobDetails(data.job_details),
        similarJobs: convertSimilarJobs(data.similar_jobs),
      }
      this.setState({
        jobData: updatedData,
        jobDetailsStatus: fetchStatus.success,
      })
    } else {
      this.setState({
        jobDetailsStatus: fetchStatus.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsFailureView = () => {
    console.log('renderJobFailureView')
    return (
      <div className="job-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          className="retry-button"
          type="button"
          onClick={this.getJobDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobDetailsSuccessView = () => {
    const {jobData} = this.state
    const {jobDetails, similarJobs} = jobData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      lifeAtCompany,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    console.log(jobDetails)
    return (
      <>
        <div className="details-card-container">
          <div className="job-item-image-container">
            <img
              className="job-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="details-description-container">
            <h1 className="details-description-heading">Description</h1>
            <a
              className="external-link"
              href={companyWebsiteUrl}
              target="noreferrer"
            >
              Visit
              <FaExternalLinkAlt className="external-icon" />
            </a>
          </div>
          <p className="details-para">{jobDescription}</p>
          <h1 className="details-description-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachItem => (
              <SkillItem key={eachItem.name} skillDetails={eachItem} />
            ))}
          </ul>
          <h1 className="details-description-heading">Life at Company</h1>
          <div className="life-description-container">
            <p className="life-description">{lifeAtCompany.description}</p>
            <img
              className="life-image"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="details-description-heading">Similar Jobs</h1>
        <ul className="similar-list-container">
          {similarJobs.map(eachItem => (
            <SimilarJob jobDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  renderAllJobDetailsView = () => {
    const {jobDetailsStatus} = this.state

    switch (jobDetailsStatus) {
      case fetchStatus.loading:
        return this.renderLoadingView()
      case fetchStatus.success:
        return this.renderJobDetailsSuccessView()
      case fetchStatus.failure:
        return this.renderJobDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="details-bg-container">
        <div className="nav-container">
          <Header />
        </div>
        <div className="details-bottom-container">
          {this.renderAllJobDetailsView()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
