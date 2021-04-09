import React, { Component } from "react";
import Header from "../components/Header";
import BusApiService from "../Service/BusApiService";

class AddBusScreen extends Component {
  constructor(props) {
    super(props);

    this.saveBus = this.saveBus.bind(this);

    this.state = {
      busName: "",
      busType: "",
      busNumber: "",
      totalSeats: "",
      message: null,
    };
  }

  saveBus = (e) => {
    e.preventDefault();
    const bus = {
      busName: this.state.busName,
      busType: this.state.busType,
      busNumber: this.state.busNumber,
      totalSeats: this.state.totalSeats,
    };
    BusApiService.addBus(bus).then((res) => {
      this.setState({ message: "Bus added successfully." });
      this.props.history.push("/home");
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <Header title="Add Bus" />
        <div className="mb-3">
          <form>
            <div className="form-group">
              <label>Bus Name:</label>
              <input
                type="text"
                name="busName"
                className="form-control"
                value={this.state.busName}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Bus Type:</label>
              <input
                type="text"
                name="busType"
                className="form-control"
                value={this.state.busType}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Bus Number:</label>
              <input
                type="text"
                name="busNumber"
                className="form-control"
                value={this.state.busNumber}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Total Seats:</label>
              <input
                type="Number"
                name="totalSeats"
                className="form-control"
                value={this.state.totalSeats}
                onChange={this.onChange}
              />
            </div>

            <button className="btn btn-success mb-3" onClick={this.saveBus}>
              Add Bus
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddBusScreen;
