import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import UserApiService from "../Service/UserApiService";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignin = (e) => {
    e.preventDefault();
    console.log(`email : ${email}`);
    console.log(`password : ${password}`);
    UserApiService.signin(email, password)
      .then((response) => {
        console.log(`data : ${response.data.token}`);
        console.log(`data : ${response.data.user.id}`);
        console.log(`data : ${response.data.user.authStatus}`);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("userId", response.data.user.id);
        if (
          response.data.user.role === "PASSENGER" ||
          response.data.user.role === "AGENT"
        ) {
          props.history.push("/view-bus");
        } else if (response.data.user.role === "MANAGER") {
          props.history.push("/manager");
        } else if (response.data.user.role === "OWNER") {
          props.history.push("/owner");
        }
      })
      .catch((error) => {
        console.log(`error : ${error}`);
      });
  };

  return (
    <div>
      <Header title="Sign In" />
      <div className="form">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="form-control"
            placeholder="test@test.com"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            placeholder="*****"
          ></input>
        </div>
        <div className="mb-3">
          <button onClick={onSignin} className="btn btn-success">
            Signin
          </button>
          <div className="float-end">
            New User? <Link to="/signup">Signup here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
