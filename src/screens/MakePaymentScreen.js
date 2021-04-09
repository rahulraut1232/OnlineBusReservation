import React, { Component } from "react";
import PaymentApiService from "../Service/PaymentApiService";

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
    };
  }
  savePayment = (e) => {
    // e.preventDefault();
    // const bus = {busName: this.state.busName, busType: this.state.busType, busNumber: this.state.busNumber, totalSeats: this.state.totalSeats};
    // BusApiService.addBus(bus)
    //     .then(res => {
    //         this.setState({message : 'Bus added successfully.'});
    //         this.props.history.push('/home');
    //     });
    this.props.history.push("/payment-status");
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <h2 className="text-center">Choose Payment Method</h2>
        <form>
          <div className="form-group mb-2">
            <input
              type="radio"
              className="form-check-input"
              id="creditCard"
              name="payment"
              value={this.state.creditCard}
              onChange={this.onChange}
            />
            <label>Credit Card:</label>
          </div>

          <div className="form-group mb-2">
            <input
              type="radio"
              className="form-check-input"
              id="debitCard"
              name="payment"
              value={this.state.debitCard}
              onChange={this.onChange}
            />
            <label>Debit Card:</label>
          </div>

          <div className="form-group mb-2">
            <input
              type="radio"
              className="form-check-input"
              id="wallet"
              name="payment"
              value={this.state.wallet}
              onChange={this.onChange}
            />
            <label>Wallet:</label>
          </div>

          <div className="form-group mb-2">
            <input
              type="radio"
              className="form-check-input"
              id="netBanking"
              name="payment"
              value={this.state.netBanking}
              onChange={this.onChange}
            />
            <label>NetBanking:</label>
          </div>

          <div className="form-group mb-2">
            <input
              type="radio"
              className="form-check-input"
              id="upi"
              name="payment"
              value={this.state.upi}
              onChange={this.onChange}
            />
            <label>UPI:</label>
          </div>

          <button
            className="btn btn-success mb-2 me-2"
            onClick={this.savePayment}
          >
            Proceed
          </button>
          <button className="btn btn-success mb-2 me-2" onClick={this.cancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default MakePaymentScreen;
