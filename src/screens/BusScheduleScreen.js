import React from "react";
import Header from "../components/Header";
import { find } from "lodash";
import ManagerApiService from "../Service/ManagerApiService";

export default class BusScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buses: [],
      selectedBusId: -1,
      routes: [],
      selectedSource: "",
      selectedDestination: "",
      arrivalTime: "",
      deptTime: "",
      uniqueSources: [],
    };
    this.onSelectBus = this.onSelectBus.bind(this);
    this.onSelectRouteSource = this.onSelectRouteSource.bind(this);
    this.onSelectRouteDestination = this.onSelectRouteDestination.bind(this);
    this.addSchedule = this.addSchedule.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ManagerApiService.getSchdeduleDetails().then((response) => {
      if (!response.data) {
        console.log(`error`);
      } else {
        this.setState({
          buses: response.data.buses,
          routes: response.data.routes,
        });
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
      }
    });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSelectBus(event) {
    let selectedBus = event.target.value;
    selectedBus = find(this.state.buses, { busName: selectedBus });
    //let selectedBus = find(this.state.buses, { busName: selectedBus });
    // let index = -1;
    // for (let itr = 0; itr < this.state.buses.length; itr++) {
    //   let currentBus = this.state.buses[itr];
    //   if (currentBus["busName"] === selectedBus) {
    //     index = itr;
    //     break;
    //   }
    // }
    if (selectedBus) {
      //alert(selectedBus["id"]);
      this.setState({ selectedBusId: selectedBus["id"] });
    }
  }

  onSelectRouteSource(event) {
    this.setState({ selectedSource: event.target.value });
  }
  onSelectRouteDestination(event) {
    this.setState({ selectedDestination: event.target.value });
  }

  addSchedule(e) {
    e.preventDefault();
    const route = find(this.state.routes, {
      source: this.state.selectedSource,
      destination: this.state.selectedDestination,
    });
    const busSchedule = {
      arrivalTime: this.state.arrivalTime,
      deptTime: this.state.deptTime,
      busId: this.state.selectedBusId,
      routeId: route.id,
    };
    console.log(`arrival time : ${this.state.arrivalTime}`);
    console.log(`dept  time : ${this.state.deptTime}`);
    ManagerApiService.addScheduleDetails(busSchedule).then((response) => {
      console.log(`data : ${response.data}`);
      console.log(`status : ${response.status}`);
      this.props.history.push("/manager");
    });
  }

  render() {
    return (
      <div>
        <Header title="Bus Scheduling" />
        <div className="form-group">
          <label>Buses :</label>
          <select name="bus" onChange={this.onSelectBus}>
            <option value={"None"}>{"None"}</option>
            {this.state.buses.length > 0 &&
              this.state.buses.map((bus) => {
                return (
                  <option value={bus.busName} key={bus.id}>
                    {bus.busName}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Route Source :</label>
          <select name="selectedSource" onChange={this.onChange}>
            <option value={"None"}>{"None"}</option>
            {this.state.uniqueSources.length > 0 &&
              this.state.uniqueSources.map((uniqueSource) => {
                return <option value={uniqueSource}>{uniqueSource}</option>;
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Route Destination :</label>
          <select name="selectedDestination" onChange={this.onChange}>
            <option value={"None"}>{"None"}</option>
            {this.state.routes.length > 0 &&
              this.state.routes
                .filter((route) => route.source === this.state.selectedSource)
                .map((route) => {
                  return (
                    <option value={route.destination} key={route.id}>
                      {route.destination}
                    </option>
                  );
                })}
          </select>
        </div>
        <label for="arrivalTime">Arrival Time(date and time):</label>
        <input
          type="datetime-local"
          id="arrivalTime"
          name="arrivalTime"
          onChange={this.onChange}
        ></input>
        <label for="deptTime">Departure Time(date and time):</label>
        <input
          type="datetime-local"
          id="deptTime"
          name="deptTime"
          onChange={this.onChange}
        ></input>
        <button className="btn btn-success mb-3" onClick={this.addSchedule}>
          Add Schedule
        </button>
      </div>
    );
  }
}
