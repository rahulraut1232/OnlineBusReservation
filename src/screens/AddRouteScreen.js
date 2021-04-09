import React, { Component } from "react";
import Header from "../components/Header";
import RouteApiService from "../Service/RouteApiService";

class AddRouteScreen extends Component {
  constructor(props) {
    super(props);

    this.saveRoute = this.saveRoute.bind(this);

    this.state = {
      source: "",
      destination: "",
      message: null,
    };
  }

  saveRoute = (e) => {
    e.preventDefault();
    const route = {
      source: this.state.source,
      destination: this.state.destination,
    };
    RouteApiService.addRoute(route).then((res) => {
      this.setState({ message: "Route added successfully." });
      this.props.history.push("/home");
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <Header title="Add Route" />
        <div className="mb-3">
          <form>
            <div className="form-group mb-3">
              <label>Enter Source:</label>
              <input
                type="text"
                name="source"
                className="form-control"
                value={this.state.source}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Enter Destination:</label>
              <input
                type="text"
                name="destination"
                className="form-control"
                value={this.state.destination}
                onChange={this.onChange}
              />
            </div>

            <button
              className="btn btn-success me-2 mb-3"
              onClick={this.saveRoute}
            >
              Add Route
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddRouteScreen;
