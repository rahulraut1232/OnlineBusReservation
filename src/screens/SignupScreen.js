import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import HomeNavigation from "../components/HomeNavigation";
import UserApiService from "../Service/UserApiService";
import signup from "../assets/signup.jpg"; 
import swal from "sweetalert";

const SignupScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [userDob, setUserDob] = useState(new Date());
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [userGender, setUserGender] = useState("");
  const onSignup = (e) => {
   // e.preventDefault();
   /* if (userPassword !== userConfirmPassword) {
      setStatus(true);
    } else */ {
      const user = {
        name: userName,
        dob: userDob,
        mobile: userMobile,
        email: userEmail,
        password: userPassword,
        gender:userGender
      };
      console.log(`name : ${user.name}`);
      console.log(`dob : ${user.dob}`);
      console.log(`mobile : ${user.mobile}`);
      console.log(`email : ${user.email}`);
      console.log(`password : ${user.password}`);
      UserApiService.signup(user)
        .then((response) => {
          console.log(`message : ${response.data}`);
          
        })
        .catch((error) => {
          console.log(`message : ${error}`);
        });
        swal("Sign up Success","Sign Up successfull","success");
      props.history.push("/signin");
    }
  };

  const validate = () => {
    var regEx = /^[a-zA-Z\s]+$/;
    var pattern = /^[6-9]\d{9}$/gi;
    if (userName === "") {
      swal("Error", "Please enter Name", "error");
      return false;
      // } else if (!isNaN(Name)) {
      //   sweetalert("Error", "Please enter valid Name", "error");
      //   return false;
    } else if (!regEx.test(userName)) {
      swal("Error", "Please enter characters and space only", "error");
      return false;
    } else if (userMobile === "") {
      swal("Error", "Please enter Mobile number", "error");
      return false;
    } else if (
      !pattern.test(userMobile) ||
      isNaN(userMobile) ||
      userMobile.length <= 9 ||
      userMobile.length >= 11
    ) {
      swal("Error", "Please enter valid Mobile number", "error");
      return false;
    } else if (userEmail === "") {
      swal("Error", "Please enter email", "error");
      return false;
    } else if (userEmail.indexOf("@") <= 0) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (
      userEmail.charAt(userEmail.length - 4) !== "." &&
      userEmail.charAt(userEmail.length - 3) !== "."
    ) {
      swal("Error", "Please enter valid email", "error");
      return false;
    } else if (userPassword === "") {
      swal("Error", "Please enter password", "error");
      return false;
    } else if (userPassword.length <= 5 ) {
      // sweetalert("Error", "Please enter Strong password", "error");
      swal("Error", "Password must be atleast 6 character", "error");

      return false;
    }/* else if (City === "") {
      sweetalert("Error", "Please enter city", "error");
      return false;
    } else if (!isNaN(City)) {
      sweetalert("Error", "Please enter valid city", "error");
      return false;
    } else if (Role === "") {
      sweetalert("Error", "Please select role", "error");
      return false;
    }*/
    onSignup();
  };

  return (
    <div className="bg-light" style={{background:`url(${signup})`, backgroundSize:"cover", height:"900px"}}>
      <HomeNavigation/>
      <div >
      <div className="text-center" style={{fontFamily:"cursive", fontSize:"50px", marginTop:"10px", color:"white"}}>Sign Up</div>
      <div className="row" >
      <div className="col-md-3"></div>
      <div className="col-md-6">
      <div className="form form-control mt-3 bg-dark" style={{ boxShadow: "2px 2px 10px black",opacity:"0.8", color:"white"}}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Date Of Birth</label>
          <input
            onChange={(e) => {
              setUserDob(e.target.value);
            }}
            type="date"
            className="form-control d-inline"
          />
          
          </div>
          <label className="form-label mb-2">Gender</label>
          <div className="">
          
          <select className="custom-select custom-select-lg mb-3 p-2" style={{width:"100px"}}onChange={(e) => {
              setUserGender(e.target.value);
            }}>
            <option selected>None</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
        </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            onChange={(e) => {
              setUserMobile(e.target.value);
            }}
            type="number"
            className="form-control"
          />
        </div>
        
        <div>
        
        
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            type="password"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            onChange={(e) => {
              setUserConfirmPassword(e.target.value);
            }}
            type="password"
            className="form-control"
          ></input>
        </div>
        {status === true && (
          <div>
            <h5>*Passwords do not match</h5>
          </div>
        )}
        <div className="mb-3">
          <button onClick={validate} className="btn btn-success">
            Sign Up
          </button>
          <div className="float-end">
            Old User? <Link to="/signin">SignIn Here</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>

    
  );
};

export default SignupScreen;
