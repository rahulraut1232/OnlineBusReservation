import { Link } from "react-router-dom";

const OwnerNavigation = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/royal-travels">
          <span className="navbar-brand">Royal Travels</span>
        </Link>

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/home">
              <span className="nav-link">Home</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-manager">
              <span className="nav-link">Appoint Manager</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-route">
              <span className="nav-link">Add Route</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-bus">
              <span className="nav-link">Add Bus</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-driver">
              <span className="nav-link">Add Driver</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-agent">
              <span className="nav-link">Appoint Agent</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/view-bookings">
              <span className="nav-link">View Bookings</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/view-profile">
              <span className="nav-link">View My Profile</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/edit-profile">
              <span className="nav-link">Edit Profile</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/change-password">
              <span className="nav-link">Change Password</span>
            </Link>
          </li>
        </ul>
        <div className="d-flex">
          <button className="btn btn-outline-success">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavigation;
