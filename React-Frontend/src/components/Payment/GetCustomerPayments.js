import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css"
import Navigation from "../Login/Navigation";
function GetCustomerPayments() {
  let initialPayment = [];
  let [payments, setPayments] = useState(initialPayment);
  let [number, setNumber] = useState(sessionStorage.getItem('cardNumber'));
  let [btnId, setBtnId] = useState('')

  useEffect(() => {
    const URL = `http://localhost:9090/payment/paymentHistory/${number}`;
    axios
      .get(URL)
      .then((response) => {
        setPayments(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [btnId]);


  function handleBtnClick() {
    setBtnId(number)
  }

  return (
    <div>
      <Navigation />
      <div className="container">
        <h1 style={{ marginLeft: "40%" }}>Payment detail by Card number </h1>
        {/* <hr />
        <div className="form-group form-center" >
          <label style={{ marginLeft: "40%" }}>Enter Card number</label>
          <input
            className="form-control"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button style={{ marginLeft: "40%" }} onClick={handleBtnClick} className='btn btn-success mt-2'>Get Details</button>
        </div>
        <hr /> */}

        <table className="table table-stripped table-bordered table-hover table-dark" style={{ backgroundColor: 'pink' }}>
          <thead>

            <tr>
              <th>Amount</th>
              <th>PaidDate</th>
              <th>PaidTime</th>
              <th>PaymentId</th>
              <th>PaymentMethod</th>
              <th>CardNumber</th>


            </tr>
          </thead>
          <tbody>
            {payments.map(
              payment =>
                <tr key={payment.paymentID}>
                  <td>{payment.amount}</td>
                  <td>{payment.paidDate}</td>
                  <td>{payment.paidTime}</td>
                  <td>{payment.paymentId}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.card}</td>

                </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetCustomerPayments;