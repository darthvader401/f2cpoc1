import React, { useState } from 'react';
import axios from 'axios';

export default function Payment() {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePayment = () => {
    if (amount === '' || amount === null) {
      alert('Please enter the amount');
      return;
    }

    axios
      .post('http://localhost:8080/farmers/create_order', { amount: amount, info: 'order_request' })
      .then((response) => {
        console.log(response.data);
        // Handle the response data here
      })
      .catch((error) => {
        console.log(error);
        // Handle any error that occurs during the request
      });
  };

  return (
    <div className="payment-form">
      <h2>Payment Form</h2>
      <form>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="amount-input"
          />
        </label>
        <button type="button" onClick={handlePayment} className="pay-button">
          Pay
        </button>
      </form>
    </div>
  );
}
