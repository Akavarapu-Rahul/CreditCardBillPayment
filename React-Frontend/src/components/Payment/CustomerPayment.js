import React, { Component } from 'react'
import axios from 'axios'
import Navigation from '../Login/Navigation'

export class CustomerPayment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: '',
            paidDate: '',
            paidTime: '',
            paymentId: '',
            paymentMethod: '',
            card: {
                cardNumber: ''
            }
        }
        this.cancel = this.cancel.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:9090/payment/pay', this.state).then(response => {
            console.log(response);
            alert("Details Added Successfully")
        })
            .catch(error => {
                console.log(error);
            })

        // PaymentService.addpayment(this.state)

    }

    cancel() {
        this.props.history.push("/getAllPayment");
    }

    render() {
        const { amount, paidDate, paidTime, paymentId, paymentMethod, card: { cardNumber } } = this.state
        return (
            <div>
                <Navigation />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Payment</h3>
                            <div className="card-body">
                                <form className="form-group" onSubmit={this.submitHandler}>
                                    <div className="form-group">
                                        <label>Payment Id</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Payment Id"
                                            type="text"
                                            name="paymentId"
                                            value={paymentId}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />

                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Amount"
                                            type="text"
                                            name="amount"
                                            value={amount}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>

                                    <br />


                                    <div className="form-group">
                                        <label>PaymentDate</label>
                                        <input
                                            type="Date"
                                            className="form-control"
                                            placeholder="Enter Billing Date"
                                            name="paidDate"
                                            value={paidDate}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>PaidTime</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Bill Amount"
                                            type="time"
                                            name="paidTime"
                                            value={paidTime}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />

                                    <div className="form-group">
                                        <label> Payment Type </label>
                                        <select name="paymentMethod" className="form-control"
                                            value={paymentMethod} onChange={this.changeHandler} required>
                                            <option value="null">Choose your payment mode</option>
                                            <option value="upi">UPI</option>
                                            <option value="netbanking">Net Banking</option>
                                            <option value="cardpayment">Card Payment</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>CardNumber</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter your Card Number"
                                            type="text"
                                            name="cardNumber"
                                            value={cardNumber}
                                            onChange={e => this.setState({ card: { cardNumber: e.target.value } })}
                                            required
                                        />
                                    </div>


                                    <center>
                                        <button className="btn btn-primary mr-2" >Add Payment</button>
                                        {/* <button className="btn btn-danger" onClick={this.cancel} >Cancel</button> */}
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CustomerPayment
