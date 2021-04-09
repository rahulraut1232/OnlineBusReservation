import React, { Component } from "react";
import Header from "../components/Header";
import ManagerApiService from "./../Service/ManagerApiService";

class AddAgentScreen extends Component {
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
    this.saveAgent = this.saveAgent.bind(this);
  }
  saveAgent = (e) => {
    e.preventDefault();
    const agent = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
      gender: this.state.gender,
      dob: this.state.dob,
    };
    ManagerApiService.addAgent(agent).then((res) => {
      this.setState({ message: "Agent added successfully." });
      this.props.history.push("/home");
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <Header title="Add Agent" />
        <div>
          <form>
            <div className="form-group">
              <label>Agent Name:</label>
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

            <button className="btn btn-success" onClick={this.saveAgent}>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAgentScreen;
