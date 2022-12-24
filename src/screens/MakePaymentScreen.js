import React, { Component } from "react";
import PaymentApiService from "../Service/PaymentApiService";
import BusApiService from "../Service/BusApiService";
import UserNavigation from "../components/UserNavigation";

class MakePaymentScreen extends Component {
  constructor(props) {
    super(props);

    this.savePayment = this.savePayment.bind(this);

    this.state = {
      creditCard: "",
      debitCard: "",
      wallet: "",
      netBanking: "",
      upi: "",
      message: null,
      user: localStorage.getItem('user')
    };
  }
  savePayment = (e) => {
     e.preventDefault();
     const bus = {busName: this.state.busName, busType: this.state.busType, busNumber: this.state.busNumber, totalSeats: this.state.totalSeats};
     BusApiService.addBus(bus)
        .then(res => {
            this.setState({message : 'Bus added successfully.'});
            this.props.history.push('/view-bus');
        });
    this.props.history.push("/payment-status");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        {this.state.user==null?
        this.props.history.push("/signin"):
      <div>
        <UserNavigation/>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
        <h2 className="text-center" style={{fontSize:"50px"}}>Choose Payment Method</h2>
        <form className="form-control mb-5 bg-dark text-light" style={{fontSize:"20px", boxShadow:"2px 2px 10px black"}}>
          <div className="form-group mb-2 form-check">
            <input
              type="radio"
              className="form-check-input "
              id="creditCard"
              name="payment"
              value={this.state.creditCard}
              onChange={this.onChange}
            />
            <label className="d-inline">Credit Card</label>
          </div>

          <div className="form-group mb-2 form-check">
            <input
              type="radio"
              className="form-check-input"
              id="debitCard"
              name="payment"
              value={this.state.debitCard}
              onChange={this.onChange}
            />
            <label>Debit Card</label>
          </div>

          <div className="form-group mb-2 form-check">
            <input
              type="radio"
              className="form-check-input"
              id="wallet"
              name="payment"
              value={this.state.wallet}
              onChange={this.onChange}
            />
            <label>Wallet</label>
          </div>

          <div className="form-group mb-2 form-check">
            <input
              type="radio"
              className="form-check-input"
              id="netBanking"
              name="payment"
              value={this.state.netBanking}
              onChange={this.onChange}
            />
            <label>NetBanking</label>
          </div>

          <div className="form-group mb-2 form-check">
            <input
              type="radio"
              className="form-check-input"
              id="upi"
              name="payment"
              value={this.state.upi}
              onChange={this.onChange}
            />
            <label>UPI</label>
          </div>

          <button
            className="btn btn-warning mb-2 me-2 mt-3"
            onClick={this.savePayment}
          >
            Proceed
          </button>
          <button className="btn btn-danger mb-2 me-2 mt-3" onClick={this.cancel}>
            Cancel
          </button>
        </form>
        </div>
        </div>
      </div>
  }
      </div>
    );
  }
}

export default MakePaymentScreen;
