import { Link } from "react-router-dom";

const HomeNavigation = (props) => {
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
            <Link to="/signin">
              <span className="nav-link">Sign In</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/signup">
              <span className="nav-link">Sign Up</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/about">
              <span className="nav-link">About Us</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/contact">
              <span className="nav-link">Contact Us</span>
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

export default HomeNavigation;
