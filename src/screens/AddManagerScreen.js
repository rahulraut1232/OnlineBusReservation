import React, { Component } from "react";
import OwnerApiService from "./../Service/OwnerApiService";
import Header from "../components/Header";

class AddManagerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
      dob: "",
    };
    this.saveManager = this.saveManager.bind(this);
  }
  saveManager = (e) => {
    e.preventDefault();
    const manager = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
      dob: this.state.dob,
    };
    OwnerApiService.addManager(manager).then((res) => {
      this.setState({ message: "Manager added successfully." });
      this.props.history.push("/home");
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <Header title="Add Manager" />
        <div>
          <form>
            <div className="form-group">
              <label>Manager Name:</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                placeholder="Password"
                name="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Mobile:</label>
              <input
                type="number"
                placeholder="Mobile"
                name="mobile"
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
              <label>Birth Date:</label>
              <input
                type="date"
                placeholder="Birth Date"
                name="dob"
                className="form-control"
                value={this.state.dob}
                onChange={this.onChange}
              />
            </div>

            <button className="btn btn-success" onClick={this.saveManager}>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddManagerScreen;
