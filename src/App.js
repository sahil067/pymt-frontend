import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";

function App() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook"

  });

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:4000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE ", response)
      const {status} = response;
      console.log("STATUS", status)
    })
    .catch(error => console.log(error));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout 
        stripeKey="pk_test_51I5ZBCAdfLcrQvKKdcJEsv7jq65rHNGWPBSWXc6yX5nabFFxWDjbPSmQ3b4PYlBQ8X7IVLFOHegDk9hUo0pyvLLY009tGiZ34f" 
        token={makePayment} 
        name="Buy somthing"
        amount={product.price * 100}
        shippingAddress
        billingAddress

        >
          <button className="btn-large skyblue">
          buy phone in {product.price} Rs
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
