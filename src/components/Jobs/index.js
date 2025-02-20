import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import EmploymentItem from '../EmploymentItem'
import LocationItem from '../LocationItem'
import JobItem from '../JobItem'
import SalaryItem from '../SalaryItem'

import './index.css'

const fetchStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationTypesList = [
  {
    locationId: 'HYDERABAD',
    label: 'Hyderabad',
  },
  {
    locationId: 'BANGALORE',
    label: 'Bangalore',
  },
  {
    locationId: 'CHENNAI',
    label: 'Chennai',
  },
  {
    locationId: 'DELHI',
    label: 'Delhi',
  },
  {
    locationId: 'MUMBAI',
    label: 'Mumbai',
  },
]

class Jobs extends Component {
  state = {
    jobStatus: fetchStatus.initial,
    profileStatus: fetchStatus.initial,
    profileData: {},
    jobData: {},
    employmentList: [],
    searchText: '',
    locationStatusList: [],
    selectedSalary: '',
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.getProfileData()
    this.getJobData()
  }

  updateSearchText = event => {
    console.log('updateSearchText')
    this.setState({searchText: event.target.value})
  }

  addEmploymentList = (label, isChecked) => {
    if (isChecked === false) {
      this.setState(
        prevState => ({
          employmentList: prevState.employmentList.filter(
            eachItem => eachItem !== label,
          ),
        }),
        this.getJobData,
      )
    } else {
      this.setState(
        prevState => ({
          employmentList: [...prevState.employmentList, label],
        }),
        this.getJobData,
      )
    }
  }

  addLocationList = (label, isChecked) => {
    if (isChecked === false) {
      this.setState(
        prevState => ({
          locationStatusList: prevState.locationStatusList.filter(
            eachItem => eachItem !== label,
          ),
        }),
        this.getJobData,
      )
    } else {
      this.setState(
        prevState => ({
          locationStatusList: [...prevState.locationStatusList, label],
        }),
        this.getJobData,
      )
    }
  }

  addSalaryList = label => {
    this.setState(
      {
        selectedSalary: label,
      },
      this.getJobData,
    )
  }

  getProfileData = async () => {
    this.setState({profileStatus: fetchStatus.loading})
    console.log('getProfileData')
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchData = data.profile_details
      const updatedData = {
        profileImageUrl: fetchData.profile_image_url,
        name: fetchData.name,
        shortBio: fetchData.short_bio,
      }
      this.setState({
        profileData: updatedData,
        profileStatus: fetchStatus.success,
      })
    } else {
      this.setState({
        profileStatus: fetchStatus.failure,
      })
    }
  }

  getJobData = async () => {
    this.setState({jobStatus: fetchStatus.loading})
    console.log('getJobData')
    const {searchText, employmentList, locationStatusList, selectedSalary} =
      this.state
    const emString = employmentList.join(',')
    const locationString = locationStatusList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${emString}&minimum_package=${selectedSalary}&search=${searchText}&location=${locationString}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchData = data.jobs
      console.log(fetchData)
      const updatedJobs = fetchData.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({jobData: updatedJobs, jobStatus: fetchStatus.success})
    } else {
      this.setState({jobStatus: fetchStatus.failure})
    }
  }

  renderLoadingView = () => {
    console.log('renderLoadingView')
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderLoadingViewProfile = () => {
    console.log('renderLoadingViewProfile')
    return (
      <div className="loader-profile" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderAllProfileView = () => {
    console.log('renderAllProfileView')
    const {profileStatus} = this.state

    switch (profileStatus) {
      case fetchStatus.loading:
        return this.renderLoadingViewProfile()
      case fetchStatus.success:
        return this.renderProfileSuccessView()
      case fetchStatus.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderProfileSuccessView = () => {
    console.log('renderProfileSuccessView')
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile-container">
        <img className="profile-icon" src={profileImageUrl} alt="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => {
    console.log('renderProfileFailureView')
    return (
      <div className="profile-failure-container">
        <button
          className="retry-button"
          onClick={this.getProfileData}
          type="button"
        >
          Retry
        </button>
      </div>
    )
  }

  renderAllJobsView = () => {
    console.log('renderAllJobsView')
    const {jobStatus} = this.state

    switch (jobStatus) {
      case fetchStatus.loading:
        return this.renderLoadingView()
      case fetchStatus.success:
        return this.renderJobSuccessView()
      case fetchStatus.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  renderNoJobView = () => {
    console.log('renderJobFailureView')
    return (
      <div className="job-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
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

  renderJobSuccessView = () => {
    const {searchText, jobData} = this.state
    console.log('renderJobSuccessView')
    return jobData.length === 0 ? (
      this.renderNoJobView()
    ) : (
      <div className="job-container">
        <div className="search-container" data-testid="searchbox">
          <input
            placeholder="Search"
            
            onChange={this.updateSearchText}
            className="search-bar"
            value={searchText}
            type="search"
          />
          <button
            onClick={this.getJobData}
            className="search-button"
            type="button"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="jobs-list-container">
          {jobData.map(eachJob => (
            <JobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobFailureView = () => {
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
          onClick={this.getJobData}
        >
          Retry
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="job-bg-container">
        <div className="nav-container">
          <Header />
        </div>
        <div className="job-bottom-container">
          <div className="job-left-container">
            <div className="job-profile-container">
              {this.renderAllProfileView()}
              <div className="employment-list-container">
                <h1 className="employment-heading">Type of Employment</h1>
                <ul className="employment-list">
                  {employmentTypesList.map(eachItem => (
                    <EmploymentItem
                      addEmploymentList={this.addEmploymentList}
                      employDetails={eachItem}
                      key={eachItem.employmentTypeId}
                    />
                  ))}
                </ul>
              </div>
              <div className="salary-list-container">
                <h1 className="employment-heading">Salary Range</h1>
                <ul className="employment-list">
                  {salaryRangesList.map(eachItem => (
                    <SalaryItem
                      addSalaryList={this.addSalaryList}
                      salaryDetails={eachItem}
                      key={eachItem.salaryRangeId}
                    />
                  ))}
                </ul>
              </div>
              <div className="employment-list-container">
                <h1 className="employment-heading">Location</h1>
                <ul className="employment-list">
                  {locationTypesList.map(eachItem => (
                    <LocationItem
                      addLocationList={this.addLocationList}
                      locationDetails={eachItem}
                      key={eachItem.locationId}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bottom-right-container">
            {this.renderAllJobsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
