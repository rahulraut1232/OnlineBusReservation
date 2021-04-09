import { Component } from "react";
import BookingApiService from "../Service/BookingApiService";

class ViewBookingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      message: null,
    };
    this.loadBookings = this.loadBookings.bind(this);
  }
  componentDidMount() {
    this.loadBookings();
  }

  loadBookings() {
    BookingApiService.viewBookings(window.localStorage.getItem("busId")).then(
      (res) => {
        this.setState({
          bookings: res.data,
        });
        console.log("res : ", res);
        this.setState({ message: "Bookings List Fetched Successfully." });
      }
    );
  }

  render() {
    return (
      <div className="mb-3">
        <h2 className="text-center">View All Bookings</h2>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>BookingId</th>
              <th>DateOfJourney</th>
              <th>DateOfBooking</th>
              <th>BookingType</th>
              <th>SeatNumber</th>
              <th>Fare</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bookings.map((booking) => {
              return (
                <tr>
                  <td>{booking.id}</td>
                  <td>{booking.dateOfJourney}</td>
                  <td>{booking.dateOfBooking}</td>
                  <td>{booking.bookType}</td>
                  <td>{booking.seatNumber}</td>
                  <td>{booking.fare}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewBookingsScreen;
