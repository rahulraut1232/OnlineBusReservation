import axios from "axios";

axios.defaults.baseURL =  "http://localhost:9001";  //"https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class UserApiService {
  signup(user) {
    return axios.post("/user/signup", user);
  }
  signin(email, password) {
    const body = {
      email,
      password,
    };
    console.log(`email : ${email} and password : ${password}`);
    return axios.post("/user/signin", body);
  }
  editProfile(profile) {
    console.log(`profile : ${profile.name}`);
    const userId = localStorage.getItem("userId");
    console.log(`userId : ${localStorage.getItem("userId")}`);
    return axios.post("/user/edit-profile/" + userId, profile, header);
  }
  viewProfile(userId) {
    console.log(`user id : ${userId}`);
    return axios.get("/user/view-profile/" + userId, header);
  }
  deleteUser(userId) {
    console.log(`user id : ${userId}`);
    return axios.delete("/user/delete-account/" + userId, header);
  }

  viewProfile2(userId) {
    console.log(`user id : ${userId}`);
    return axios.get("/user/view-profile-manager/" + userId, header);
  }
  editProfile2(profile) {
    console.log(`profile : ${profile.name}`);
    const userId = localStorage.getItem("userId");
    console.log(`userId : ${localStorage.getItem("userId")}`);
    return axios.post("/user/edit-profile-manager/" + userId, profile, header);
  }

  viewProfile3(userId) {
    console.log(`user id : ${userId}`);
    return axios.get("/user/view-profile-owner/" + userId, header);
  }

  editProfile3(profile) {
    console.log(`profile : ${profile.name}`);
    const userId = localStorage.getItem("userId");
    console.log(`userId : ${localStorage.getItem("userId")}`);
    return axios.post("/user/edit-profile-owner/" + userId, profile, header);
  }
}

export default new UserApiService();
