import React from "react";
import UserNavigation from "../components/UserNavigation";
import BookingApiService from "../Service/BookingApiService";
import Header from "./../components/Header"; 
import swal from "sweetalert";

/*export default class ShowBookingScreenClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userId"),
      bookings: [],
      message: null,
      user: localStorage.getItem('user')
    };
    this.loadBookings = this.loadBookings.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
    
  }

  componentWillMount() {
    console.log(`component did mount`);
    console.log(this.state.userId);
    this.loadBookings();
    
  }

  loadBookings(){

    BookingApiService.showBookings(this.state.userId)
    .then((response) => {
      this.setState({
        bookings: response.data,
      });
      console.log(this.state.bookings);
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
    });
  }

  cancelBooking(e) {
    console.log("in cancel" +e);
    //const bookID = localStorage.getItem("bookId");
    BookingApiService.cancelBooking(window.localStorage.getItem("bookId")).then(
      (res) => {
        this.setState({ message: "Booking Cancelled successfully." });
        swal("Booking Cancelled successfully","success");
        this.props.history.push("/my-bookings");
      }
    )
  }*/

  export default class ShowBookingScreenClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userId: localStorage.getItem("userId"),
        bookings: [],
        message: null,
        user: localStorage.getItem('user')
      };
      this.cancelBooking = this.cancelBooking.bind(this);
      
    }
  
    componentWillMount() {
      console.log(`component did mount`);
      console.log(this.state.userId);
      BookingApiService.showBookings(this.state.userId)
        .then((response) => {
          this.setState({
            bookings: response.data,
          });
          console.log(this.state.bookings);
        })
        .catch((error) => {
          console.log(`Error : ${error}`);
        });
    }
  
    cancelBooking(e) {
      //const bookID = localStorage.getItem("bookId");
      BookingApiService.cancelBooking(e).then(
        (res) => {
          this.setState({ message: "Booking Cancelled successfully." });
          swal("Booking Cancelled successfully","success");
          this.props.history.push("/view-bus");
        }
      )
    }

  render() {
    return (
      <div>
     {
        this.state.user === null ?
            this.props.history.push("/signin")
            :
      <div>
        <UserNavigation/>
        <Header title="My Bookings" />
        <div>
          {this.state.bookings.length > 0 && (
            <table class="table table-hover m-3" style={{width:"95vw", marginLeft:"100px", fontSize:"20px"}}>
              <thead>
                <tr>
                  
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
                      
                      <td>{booking.route.source}</td>
                      <td>{booking.route.destination}</td>
                      <td>{booking.seatNumber}</td>
                      <td>{booking.dateOfJourney}</td>
                      <td>{booking.bus.busName}</td>
                      <td>{booking.bus.busType}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger btn-lg"
                          onClick={()=>this.cancelBooking(booking.id)}
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
      }
    </div>
    );
  }
}
