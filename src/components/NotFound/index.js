import './index.css'

const NotFound = () => (
  <div className="notfound-bg-container">
    <div className="notfound-card-container">
      <img
        className="notfound-image"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
