import React, { Component } from "react";
import Header from "../components/Header";
import BusApiService from "../Service/BusApiService";
import RouteApiService from "../Service/RouteApiService";
import UserNavigation from "./../components/UserNavigation";
import moment from "moment";
import { find } from "lodash";
import BookingApiService from "../Service/BookingApiService";

class ViewBusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      dateOfJourney: "",
      routes: [],
      uniqueSources: [],
      busList: [],
      seats: -1,
      seatNo: -1,
      selectedBus: {},
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
    const bus = {
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
    // alert(`seat booked : ${this.state.seatNo}`);
    // const route = find(this.state.routes, {
    //   source: this.state.from,
    //   destination: this.state.to,
    // });
    // alert(`route source : ${route.source}`);
    const booking = {
      userId: localStorage.getItem("userId"),
      busId: this.state.selectedBus.id,
      boardingStation: 16,
      droppingStation: 18,
      seatNumber: this.state.seatNo,
      dateOfJourney: this.state.dateOfJourney,
      bookType: "COUCH",
    };
    BookingApiService.addBooking(booking).then((response) => {
      console.log(`request successful`);
      this.props.history.push("/make-payment");
      //alert(`seat booked`);
    });
  };

  render() {
    return (
      <div>
        <UserNavigation />
        <Header title="Dashboard" />
        <div className="form-group">
          <label>From :</label>
          <select name="from" onChange={this.onChange}>
            <option value={"None"}>{"None"}</option>
            {this.state.uniqueSources.length > 0 &&
              this.state.uniqueSources.map((uniqueSource) => {
                return <option value={uniqueSource}>{uniqueSource}</option>;
              })}
          </select>
        </div>
        <div className="form-group">
          <label>To :</label>
          <select name="to" onChange={this.onChange}>
            <option value={"None"}>{"None"}</option>
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
          <label for="dateofJourney">Date :</label>
          <input
            type="date"
            id="dateOfJourney"
            name="dateOfJourney"
            onChange={this.onChange}
          ></input>
        </div>
        <button className="btn btn-success mb-3" onClick={this.fetchBus}>
          Select Bus
        </button>
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
                        class="btn btn-success"
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
            <table class="table table-hover">
              <table class="table">
                <tbody>
                  <tr>
                    <td>
                      <button
                        type="button"
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
                        class="btn btn-success"
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
            <button className="btn btn-success mb-3" onClick={this.selectSeat}>
              Make Payment
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ViewBusScreen;
