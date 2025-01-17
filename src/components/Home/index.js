import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-bg-container">
        <div className="nav-container">
          <Header />
        </div>
        <div className="home-bottom-container">
          <div className="home-msg-container">
            <h1 className="home-msg-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="home-msg-para">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs" className="link-item">
              <button className="find-button" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
