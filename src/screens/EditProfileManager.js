import React from "react";
import Header from "../components/Header";
import ManagerNavigation from "../components/ManagerNavigation";
import UserApiService from "./../Service/UserApiService";
import edit from "../assets/edit.jpg";
import swal from "sweetalert";

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.editProfile = this.editProfile.bind(this);

    this.state = {
      name: "",
      email:"",
      password: "",
      mobile: "",
      gender: "",
      dob: "",
      message: null,
      user: localStorage.getItem('user')
    };
  }

  editProfile = (e) => {
    e.preventDefault();
    
    const profile = {
      name: this.state.name,
      email:this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
      gender: this.state.gender,
      dob: this.state.dob,
    };
    UserApiService.editProfile2(profile).then((res) => {
      
      this.setState({ message: "Profile Edited Succesfully." });

     // const user = localStorage.getItem("user");s
      //console.log(this.state.user.role);
      swal("Success","Profile Updated Successfully!!","success");
      this.props.history.push("/view-profile");
      //window.location.href="user/edit-profile";
     /* if (this.state.user.role === "PASSENGER" || this.state.user.role === "AGENT") {
        this.props.history.push("/view-bus");
      } else if (this.state.user.role === "MANAGER") {
        this.props.history.push("/manager");
      } else if (this.state.user.role === "OWNER") {
        this.props.history.push("/owner");
      }*/
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
    this.editProfile(e);
  };


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        {this.state.user==null ?
        this.props.history.push("/signin"):
        
       
      <div style={{}}>
        <ManagerNavigation/>
        
        <div className="row">
          <div className="col-md-1"></div>
        <div className="col-md-4 mb-3">
          <div className="text-center m-2" style={{fontSize:"50px", fontFamily:"cursive"}}>Edit Profile</div>
          <form className="form-control p-4 text-light" style={{background:"black", opacity:"0.8",boxShadow:"2px 2px 10px black"}}>
            <div className="form-group">
              <label className="mb-2">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label className="mb-2">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label className="mb-2">Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label mb-2">Mobile</label>
              <input
                name="mobile"
                type="number"
                className="form-control"
                value={this.state.mobile}
                onChange={this.onChange}
              />
            </div>
            <label className="mb-2">Gender:</label>
            <div className="form-group mb-2">
              
              <select name="gender" className="p-1" onChange={this.onChange}>
              <option value="">None</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="mb-2">DOB:</label>
              <input
                type="date"
                name="dob"
                className="form-control"
                value={this.state.dob}
                onChange={this.onChange}
              />
            </div>

            <button className="btn btn-success mb-3 mt-4 text-center" onClick={this.validate}>
              Edit Profile
            </button>
          </form>
          </div>
        </div>
      </div>
       }
      </div>
    );
  }
}

export default EditProfileScreen;
