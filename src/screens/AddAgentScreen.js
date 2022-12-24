import React, { Component } from "react";
import Header from "../components/Header";
import ManagerNavigation from "../components/ManagerNavigation";
import ManagerApiService from "./../Service/ManagerApiService";
import swal from "sweetalert";


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
      user: localStorage.getItem('user')
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
      role:"AGENT"
    };
    ManagerApiService.addAgent(agent).then((res) => {
      this.setState({ message: "Agent added successfully." });
      alert("User added successfully");
      this.props.history.push("/manager");
    });
  };

  validate = (e) => {
    var regEx = /^[a-zA-Z\s]+$/;
    var pattern = /^[6-9]\d{9}$/gi;
    if (this.state.name === "") {
      swal("Error", "Please enter Name", "error");
      return false;
      // } else if (!isNaN(Name)) {
      //   sweetalert("Error", "Please enter valid Name", "error");
      //   return false;
    } else if (!regEx.test(this.state.name)) {
      swal("Error", "Please enter characters and space only", "error");
      return false;
    } else if (this.state.mobile === "") {
      swal("Error", "Please enter Mobile number", "error");
      return false;
    } else if (
      !pattern.test(this.state.mobile) ||
      isNaN(this.state.mobile) ||
      this.state.mobile.length <= 9 ||
      this.state.mobile.length >= 11
    ) {
      swal("Error", "Please enter valid Mobile number", "error");
      return false;
    } else if (this.state.email === "") {
      swal("Error", "Please enter email", "error");
      return false;
    } else if (this.state.email.indexOf("@") <= 0) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (
      this.state.email.charAt(this.state.email.length - 4) !== "." &&
      this.state.email.charAt(this.state.email.length - 3) !== "."
    ) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (this.state.password === "") {
      swal("Error", "Please enter password", "error");
      return false;
    } else if (this.state.password.length <= 5 ) {
      // sweetalert("Error", "Please enter Strong password", "error");
      swal("Error", "Password must be atleast 6 character", "error");

      return false;
    }
    this.saveAgent(e);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        {this.state.user==null?
        this.props.history.push("/signin"):
        <div>
        <ManagerNavigation/>
        <Header title="Add Agent" />
        <div>
          <form className="container">
            <div className="form-group mb-2 mt-2">
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

            <div className="form-group  mb-2 mt-2">
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

            <div className="form-group  mb-2 mt-2">
              <label>Password:</label>
              <input
                placeholder="Password"
                name="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group  mb-2 mt-2">
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

            <div className="form-group  mb-2 mt-2">
              <label>Gender:</label>
              <select name="gender" onChange={this.onChange}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className="form-group  mb-2 mt-2">
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

            <button className="btn btn-success  mb-2 mt-2" onClick={this.validate}>
              Save
            </button>
          </form>
        </div>
        </div>
  }
      </div>
    );
  }
}

export default AddAgentScreen;
