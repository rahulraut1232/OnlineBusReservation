import { Component } from "react";
import UserApiService from "./../Service/UserApiService";

class viewProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      message: null,
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
        <header title="My-Profile" />
        <div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Fields</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Name:</td>
                <td>{this.state.user.name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{this.state.user.email}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>{this.state.user.mobile}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{this.state.user.gender}</td>
              </tr>
              <tr>
                <td>Date of Birth:</td>
                <td>{this.state.user.dob}</td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-success mb-4" onClick={this.editProfile}>
            Edit Profile
          </button>
        </div>
      </div>
    );
  }
}

export default viewProfileScreen;
