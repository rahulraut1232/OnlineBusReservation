import React, { Component, useState } from "react";
import Header from "../components/Header";
import BusApiService from "../Service/BusApiService";
import RouteApiService from "../Service/RouteApiService";
import UserNavigation from "./../components/UserNavigation";
import moment from "moment";
import { find } from "lodash";
import BookingApiService from "../Service/BookingApiService";
import SignInScreen from "./SignInScreen";
import viewBus from "../assets/viewBus.jpg";
import signup from "../assets/signup.jpg"; 
import swal from "sweetalert";

class ViewBusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:"",
      from: "",
      to: "",
      dateOfJourney: "",
      routes: [],
      uniqueSources: [],
      busList: [],
      seats: -1,
      seatNo: -1,
      selectedBus: {},
      user: localStorage.getItem('user')
    };
    this.fetchBus = this.fetchBus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectBus = this.onSelectBus.bind(this);
    this.selectSeat = this.selectSeat.bind(this);
    
  }

 

  fetchBus = (e) => {
    e.preventDefault();
    console.log(`from : ${this.state.from}`);
    console.log(`to : ${this.state.to}`);
    console.log(`dateOfJourney : ${this.state.dateOfJourney}`);
    console.log(`dateOfJourney : ${this.state.userName}`);
    const bus = {
      userName:this.state.userName,
      source: this.state.from,
      destination: this.state.to,
      dateOfJourney: this.state.dateOfJourney,
    };
    BusApiService.viewBus(bus)
      .then((response) => {
        console.log(`Response : ${response.status}`);
        this.setState({ message: "Bus details." });
        this.setState({
          busList: response.data,
        });
        this.state.busList.map((bus) => {
          console.log(`data : ${bus.bus.busName}`);
        });
      })
      .catch((error) => {
        console.log(`error : ${error}`);
      });
  };

  componentDidMount() {
    RouteApiService.getRoutes().then((response) => {
      this.setState({
        routes: response.data,
      });
      this.state.routes.map((route) => {
        console.log(`id : ${route.id}`);
      });
      console.log(`response status : ${response.status}`);
      const uniqueTags = [];
      this.state.routes.map((route) => {
        let findItem = uniqueTags.find((x) => x === route.source);
        if (!findItem) uniqueTags.push(route.source);
      });
      this.setState({
        uniqueSources: uniqueTags,
      });
      this.state.uniqueSources.map((uniqueSource) =>
        console.log(`source : ${uniqueSource}`)
      );
    });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSelectBus = (bus) => {
    // const bus = find(this.state.busList, { bus: { id: `${busId}` } });
    console.log(`bus-id : ${bus.bus.id}`);
    this.setState({
      selectedBus: bus.bus,
      seats: bus.bus.totalSeats,
    });
    console.log(`seats : ${this.state.seats}`);
  };
  selectSeat = (e) => {
    e.preventDefault();
    
    const route = find(this.state.routes, {
      source: this.state.from,
      destination: this.state.to,
    });
    //alert(`route source : ${route.source}`);
    const booking = {
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      busId: this.state.selectedBus.id,
      boardingStation: 16,
      droppingStation: 18,
      seatNumber: this.state.seatNo,
      dateOfJourney: this.state.dateOfJourney,
      bookType: "COUCH",
    };
    BookingApiService.addBooking(booking).then((response) => {
      console.log(`request warningful`);
      swal("Booking Successful",`seat booked : ${this.state.seatNo}`,"success");
      this.props.history.push("/make-payment");
      //alert(`seat booked`);
    }).catch((error) => {
      swal("Booking Successful",`seat booked : ${this.state.seatNo}`,"success");
      this.props.history.push("/make-payment");
      console.log(`error : ${error}`) ;
    });
  };

  render() {
    return (
      <div>
        {
          this.state.user === null ?
            this.props.history.push("/signin")
            :
            <div >
              <UserNavigation />
              <div style={{backgroundImage:`url(${viewBus})`, backgroundSize:"cover", backgroundRepeat:"no-repeat",height:"100vh", opacity:"0.8"}}>
              <div className="text-center p-4" style={{fontSize:"50px", color:"black", fontFamily:"cursive", textShadow: "1px 1px 1px white"}}>Welcome To Royal Bus Bookings {localStorage.getItem("name")}</div>
              <div className="row d-flex">
                  <div className="col-md-4"></div>
             <div className="col-md-4">
               <div className="form-control fs-5" style={{background:"black",boxShadow: "2px 2px 10px black", opacity:"0.9", color:"white"}}>
             <div className="form-group" >
          <label style={{display:"block", marginBottom:"10px",marginTop:"5px"}}>From :</label>
          <select name="from" style={{width:"30vw", padding:"5px"}}  onChange={this.onChange}>
            <option  value={"None"}>{"None"}</option>
            {this.state.uniqueSources.length > 0 &&
              this.state.uniqueSources.map((uniqueSource) => {
                return <option value={uniqueSource}>{uniqueSource}</option>;
              })}
          </select>
        </div>
        <div className="form-group">
          <label style={{display:"block", marginBottom:"10px",marginTop:"5px"}}>To :</label>
          <select name="to"  style={{width:"30vw", padding:"5px"}}  onChange={this.onChange}>
            <option value={"None"}>{"None"}</option>
            <option value={"Kolhapur"}>{"Kolhapur"}</option>
            {this.state.routes.length > 0 &&
              this.state.routes
                .filter((route) => route.source === this.state.from)
                .map((route) => {
                  return (
                    <option value={route.destination} key={route.id}>
                      {route.destination}
                    </option>
                  );
                })}
          </select>
        </div>
        <div className="form-group">
          <label for="dateofJourney" style={{display:"block", marginBottom:"10px",marginTop:"5px"}}>Date :</label>
          <input
            type="date"
            id="dateOfJourney"
            name="dateOfJourney"
            style={{width:"30vw", padding:"5px"}}
            onChange={this.onChange}
          ></input>
        </div>
        <div className="d-flex justify-content-center">
        <button className="btn btn-lg btn-danger my-3" onClick={this.fetchBus}>
          Select Bus
        </button>
        </div>
        </div>
        </div>
        </div>
        </div>
        {this.state.busList.length > 0 && (
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Bus Name</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {this.state.busList.map((bus) => {
              return (
                <tbody>
                  <tr>
                    <td>{bus.bus.busName}</td>
                    <td>
                      {moment(bus.arrivalTime).format("YYYY-MM-DD hh:mm a")}
                    </td>
                    <td>{moment(bus.deptTime).format("YYYY-MM-DD hh:mm a")}</td>
                    <td>{bus.bus.busType}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => {
                          this.onSelectBus(bus);
                        }}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
              {this.state.seats > 0 && (
                <div>
                  <table class="table table-hover" style={{marginLeft:"15px"}}>
                    <table class="table">
                      <tbody >
                        <tr>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="1"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              1
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="2"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              2
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="3"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              3
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="4"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              4
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="5"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              5
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="6"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              6
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="7"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              7
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="8"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              8
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="9"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              9
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="10"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              10
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="11"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              11
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="12"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              12
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="13"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              13
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="14"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              14
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="15"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              15
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="16"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              16
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="17"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              17
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="18"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              18
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="19"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              19
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="20"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              20
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="21"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              21
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="22"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              22
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="23"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              23
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="24"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              24
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="25"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              25
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="26"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              26
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="27"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              27
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="28"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              28
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="29"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              29
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="30"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              30
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="31"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              31
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="32"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              32
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="33"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              33
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="34"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              34
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="35"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              35
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="36"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              36
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="37"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              37
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="38"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              38
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="39"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              39
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-warning"
                              value="40"
                              name="seatNo"
                              onClick={this.onChange}
                            >
                              40
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </table>
                  <div className="text-center">
                  <button className="btn btn-primary mb-3" onClick={this.selectSeat}>
                    Make Payment
                  </button>
                  </div>
                </div>
              )}
            </div>
        }
      </div>
    );
  }
}

export default ViewBusScreen;
