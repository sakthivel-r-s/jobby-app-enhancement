import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <ul className="nav-list-container">
        <Link to="/" className="link-item">
          <li>
            <img
              className="nav-icon"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </li>
        </Link>
        <Link to="/" className="link-item">
          <li className="nav-list-item">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="nav-list-item">Jobs</li>
        </Link>
        <button onClick={onLogout} className="logout-button" type="button">
          Logout
        </button>
      </ul>
    </>
  )
}

export default withRouter(Header)
