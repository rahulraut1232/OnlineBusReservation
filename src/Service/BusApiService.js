import axios from "axios";

axios.defaults.baseURL = "https://immense-retreat-08081.herokuapp.com";

const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

class BusApiService {
  addBus(bus) {
    return axios.post("/bus/add-bus", bus, header);
  }
  viewBus(bus) {
    return axios.post("/bus/view-bus", bus, header);
  }
}

export default new BusApiService();
