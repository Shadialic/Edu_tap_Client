import React from 'react'
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
   useStripe, 
   useElements
  } from "@stripe/react-stripe-js";
function Checkout() {
    const stripe = useStripe();
    const elements = useElements();
  return (
    <div>Checkout</div>
  )
}

export default Checkout