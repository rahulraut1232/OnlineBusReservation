import axios from "axios";

axios.defaults.baseURL = "https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class RouteApiService {
  addRoute(route) {
    return axios.post("/route/add-route", route, header);
  }
  getRoutes() {
    return axios.get("/route/get-routes", header);
  }
}

export default new RouteApiService();
