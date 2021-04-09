import { Link } from "react-router-dom";

const UserNavigation = (props) => {
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
            <Link to="/add-booking">
              <span className="nav-link">New Bus Booking</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-cargo-booking">
              <span className="nav-link">New Cargo Booking</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/my-bookings">
              <span className="nav-link">My Bookings</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/check-reservation">
              <span className="nav-link">Check Reservation</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/feedback">
              <span className="nav-link">Feedback</span>
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

export default UserNavigation;
