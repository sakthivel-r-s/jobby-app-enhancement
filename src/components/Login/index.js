import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showLoginError: false, errorMsg: ''}

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props

    const loginUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, showLoginError: true})
    }
  }

  render() {
    const {username, password, showLoginError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-card-container">
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.submitForm} className="form-container">
            <label className="form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              placeholder="Username"
              className="form-input"
              id="username"
              value={username}
              onChange={this.updateUsername}
              type="text"
            />
            <label className="form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              placeholder="Password"
              className="form-input"
              id="password"
              onChange={this.updatePassword}
              value={password}
              type="password"
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {showLoginError ? <p className="error">*{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
