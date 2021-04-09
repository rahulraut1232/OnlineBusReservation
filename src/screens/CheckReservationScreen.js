import { Component } from "react";
import BookingApiService from "../Service/BookingApiService";

class CheckReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: "",
      message: null,
    };
    this.loadBooking = this.loadBooking.bind(this);
  }
  componentDidMount() {
    this.loadBooking();
  }

  loadBooking() {
    BookingApiService.checkReservation(
      window.localStorage.getItem("bookingId")
    ).then((res) => {
      this.setState({
        booking: res.data,
      });
      console.log("res : ", res);
      this.setState({ message: "Booking Fetched Successfully." });
    });
  }

  render() {
    return (
      <div>
        <header title="My-Profile" />
        <div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Fields</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>BookingId:</td>
                <td>{this.state.booking.id}</td>
              </tr>
              <tr>
                <td>DateOfJourney:</td>
                <td>{this.state.booking.dateOfJourney}</td>
              </tr>
              <tr>
                <td>DateOfBooking:</td>
                <td>{this.state.booking.dateOfBooking}</td>
              </tr>
              <tr>
                <td>BookingType:</td>
                <td>{this.state.booking.bookType}</td>
              </tr>
              <tr>
                <td>SeatNumber:</td>
                <td>{this.state.booking.seatNumber}</td>
              </tr>
              <tr>
                <td>Fare:</td>
                <td>{this.state.booking.fare}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CheckReservationScreen;
