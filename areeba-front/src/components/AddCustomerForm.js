import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NumValidationInput from './NumValidationInput'

export default function AddCustomerForm() {
  const [valid, setValid] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [customerNumber, setCustomerNumber] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")

  const addCustomer = async () => {
    setErrorMessage("")
    setMessage("")
    try {
      if (valid) {
        const res = await axios.post("http://localhost:8080/api/add-customer",
          { customerName, customerAddress, customerNumber })
        if (res.data.errors) {
          setMessage("")
          setErrorMessage("Please fill all the required fields")
        } else {
          setErrorMessage("")
          setMessage(res.data.message)
        }
      } else {
        setErrorMessage("Number is not valid")
      }

    } catch (error) {
      setErrorMessage("Something went wrong")
      console.log(error.message)
    }

  }
  return (
    <div className='add-customer-form'>
      <h1>Add Customer</h1>
      <NumValidationInput
        setValidProps={setValid}
        setCustomerName={setCustomerName}
        setCustomerAddress={setCustomerAddress}
        setCustomerNumber={setCustomerNumber}
      />

      <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder='Name' className='phone-input' />
      <input value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder='Address' className='phone-input' />

      <div className='form-buttons'>
        <Link to={"/"}>
          <button>
            Go Back
          </button>
        </Link>
        {errorMessage && <span style={{ color: "tomato" }}>{errorMessage}</span>}
        {message && <span style={{ color: "green" }}>{message}</span>}
        <button onClick={addCustomer}>
          Add
        </button>
      </div>
    </div>
  )
}
