import React, { Component } from "react";
import UserService from "../Service/UserApiService";

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.password = this.password.bind(this);

    this.state = {
      oldPassword: "",
      newPassword: "",
      confPassword: "",
      message: null,
      status: false,
    };
  }

  password = (e) => {
    e.preventDefault();
    if (this.state.newPassword !== this.state.confPassword) {
      this.setState((prevState) => {
        return { ...prevState, status: true };
      });
    } else {
      const password = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      };
      UserService.changePassword(password).then((response) => {
        this.setState({ message: "Change Password Succedfully." });
        const user = localStorage.getItem("user");
        if (user.role === "PASSENGER" || user.role === "AGENT") {
          this.props.history.push("/view-bus");
        } else if (user.role === "MANAGER") {
          this.props.history.push("/manager");
        } else if (user.role === "OWNER") {
          this.props.history.push("/owner");
        }
      });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="mb-3">
        <h2 className="text-center">Change Password</h2>
        <form>
          <div className="form-group">
            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              className="form-control"
              value={this.state.oldPassword}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              value={this.state.newPassword}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>confirmPassword:</label>
            <input
              type="password"
              name="confPassword"
              className="form-control"
              value={this.state.confPassword}
              onChange={this.onChange}
            />
          </div>
          {this.state.status === true && (
            <div>
              <h5>*Passwords do not match</h5>
            </div>
          )}

          <button className="btn btn-success mb-3" onClick={this.password}>
            Change Password
          </button>
        </form>
      </div>
    );
  }
}

export default ChangePasswordScreen;
