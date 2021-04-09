import React from "react";
import BookingApiService from "../Service/BookingApiService";
import Header from "./../components/Header";

export default class ShowBookingScreenClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userId"),
      bookings: [],
      message: null,
    };
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  componentWillMount() {
    console.log(`component did mount`);
    BookingApiService.showBookings(this.state.userId)
      .then((response) => {
        this.setState({
          bookings: response.data,
        });
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
      });
  }

  cancelBooking() {
    BookingApiService.cancelBooking(window.localStorage.getItem("bookId")).then(
      (res) => {
        this.setState({ message: "Booking Cancelled successfully." });
        alert("Booking Cancelled successfully.");
        //this.props.history.push("/show-booking");
      }
    );
  }

  render() {
    return (
      <div>
        <Header title="My Bookings" />
        <div>
          {this.state.bookings.length > 0 && (
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Boarding</th>
                  <th scope="col">Date</th>
                  <th scope="col">Bus Name</th>
                  <th scope="col">Bus Type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.bookings.map((booking) => {
                  return (
                    <tr>
                      <td>{booking.id}</td>
                      <td>{booking.source}</td>
                      <td>{booking.destination}</td>
                      <td>{booking.boarding}</td>
                      <td>{booking.dateOfJourney}</td>
                      <td>{booking.busName}</td>
                      <td>{booking.busType}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={this.cancelBooking}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
