import React from "react";

const PaymentStatusScreen = (props) => {
  const savePayment = () => {
    props.history.push("/view-bus");
  };
  return (
    <div>
      <h2 className="text-center">
        Your Payment Has Been Received Successfully!
      </h2>
      <button className="btn btn-success mb-2 me-2" onClick={savePayment}>
        Make Payment
      </button>
    </div>
  );
};

export default PaymentStatusScreen;
