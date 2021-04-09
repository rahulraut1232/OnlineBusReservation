import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import UserApiService from "../Service/UserApiService";

const SignupScreen = (props) => {
  const [userName, setUserName] = useState("");
  const [userDob, setUserDob] = useState(new Date());
  const [userMobile, setUserMobile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [status, setStatus] = useState(false);
  const onSignup = (e) => {
    e.preventDefault();
    if (userPassword !== userConfirmPassword) {
      setStatus(true);
    } else {
      const user = {
        name: userName,
        dob: userDob,
        mobile: userMobile,
        email: userEmail,
        password: userPassword,
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
      props.history.push("/signin");
    }
  };

  return (
    <div>
      <Header title="Sign Up" />
      <div className="form">
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
            className="form-control"
          />
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
          <button onClick={onSignup} className="btn btn-success">
            Sign Up
          </button>
          <div className="float-end">
            Old User? <Link to="/signin">SignIn Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
