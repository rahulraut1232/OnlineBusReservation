import { Link } from "react-router-dom";

const ManagerNavigation = (props) => {
  return (
    <div className="">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <div className="row " style={{width:"100vw"}}>
          
        
        <div className="col-md-12 ">
        <ul className="navbar-nav mb-auto d-flex justify-content-between text-center" style={{fontSize:"22px"}}>
          <li className="nav-item">
            <Link to="/manager">
              <span className="nav-link me-5">Home</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-route">
              <span className="nav-link me-5">Add Route</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-bus">
              <span className="nav-link me-5">Add Bus</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-driver">
              <span className="nav-link me-5">Add Driver</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-agent">
              <span className="nav-link me-5">Appoint Agent</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/view-bookings">
              <span className="nav-link me-5">View Bookings</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/bus-schedule">
              <span className="nav-link me-5">Schedule Bus</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/view-profile-manager">
              <span className="nav-link me-5">View My Profile</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/edit-profile-manager">
              <span className="nav-link me-5">Edit Profile</span>
            </Link>
          </li>

          
          
          <li className="nav-item">
            <Link to="/signin">
              <button className="btn btn-outline-warning mt-2">
              <span className="nav-link fs-6
              ">Logout</span>
              </button> 
            </Link>
          </li>
        </ul>
        </div>
      </div>
      </div>
     
    </nav>
    </div>
  );
};

export default ManagerNavigation;
