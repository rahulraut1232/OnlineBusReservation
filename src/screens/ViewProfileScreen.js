import { Component } from "react";
import UserNavigation from "../components/UserNavigation";
import UserApiService from "./../Service/UserApiService";
import contact from "../assets/contact.jpg";

class viewProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      message: null,
      user: localStorage.getItem('user')
    };
    this.loadUser = this.loadUser.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }
  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    UserApiService.viewProfile(window.localStorage.getItem("userId")).then(
      (res) => {
        this.setState({
          user: res.data,
        });
        console.log("res : ", res);
        console.log("user : ", this.state.user);
        this.setState({ message: "User Details Fetched Successfully." });
      }
    );
  }

  editProfile() {
    this.props.history.push("/edit-profile");
  }
  render() {
    return (
      <div>
        {this.state.user==null?
        this.props.history.push("/signin"):
        <div>
        <UserNavigation/>
        <header title="My-Profile" />
        <div className="row">
          <div className="col-md-1"></div>
        <div className="col-md-5">
          <div className="form-control mt-5 mb-5" style={{boxShadow:"2px 2px 2px 2px gray"}}>
          <table className="table table-striped table-hover" style={{fontSize:"20px", height:"300px"}}>
            <thead className="">
              <tr>
                <th>Fields</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              <tr className="table-secondary">
                <td>Name:</td>
                <td>{this.state.user.name}</td>
              </tr>
              <tr className="table-primary">
                <td>Email:</td>
                <td>{this.state.user.email}</td>
              </tr>
              <tr className="table-danger">
                <td>Mobile:</td>
                <td>{this.state.user.mobile}</td>
              </tr>
              <tr className="table-warning">
                <td>Gender:</td>
                <td>{this.state.user.gender}</td>
              </tr>
              <tr className="table-info">
                <td>Date of Birth:</td>
                <td>{this.state.user.dob}</td>
              </tr>
            </tbody>
          </table>
          
          <button className="btn btn-success mb-4 text-center" onClick={this.editProfile}>
            Edit Profile
          </button>
          </div>
          </div>
          <div className="col-md-4">
            <img style={{height:"400px", width:"400px", marginTop:"50px", marginLeft:"100px", borderRadius:"50%",boxShadow:"2px 2px 2px 2px gray"}} src={contact}/>
          </div>
          
          </div>
        </div>
        }
      </div>
    );
  }
}

export default viewProfileScreen;
