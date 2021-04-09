import React from "react";
import Header from "../components/Header";
import UserApiService from "./../Service/UserApiService";

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.editProfile = this.editProfile.bind(this);

    this.state = {
      name: "",
      password: "",
      mobile: "",
      gender: "",
      dob: "",
      message: null,
    };
  }

  editProfile = (e) => {
    e.preventDefault();
    const profile = {
      name: this.state.name,
      password: this.state.password,
      mobile: this.state.mobile,
      gender: this.state.gender,
      dob: this.state.dob,
    };
    UserApiService.editProfile(profile).then((res) => {
      this.setState({ message: "Profile Edited Succedfully." });
      const user = localStorage.getItem("user");
      if (user.role === "PASSENGER" || user.role === "AGENT") {
        this.props.history.push("/view-bus");
      } else if (user.role === "MANAGER") {
        this.props.history.push("/manager");
      } else if (user.role === "OWNER") {
        this.props.history.push("/owner");
      }
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <Header title="Edit Profile" />
        <div className="mb-3">
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                name="mobile"
                type="number"
                className="form-control"
                value={this.state.mobile}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select name="gender" onChange={this.onChange}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>dob:</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={this.state.dob}
                onChange={this.onChange}
              />
            </div>

            <button className="btn btn-success mb-3" onClick={this.editProfile}>
              Edit Profile
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfileScreen;
