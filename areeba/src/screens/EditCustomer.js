import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NumValidationEdit from '../components/NumValidationEdit'

export default function EditCustomer() {
  const [valid, setValid] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [customerNumber, setCustomerNumber] = useState(null)
  const [data, setData] = useState({})
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")
  let { id } = useParams()
  const getCustomerInfo = async () => {
    const res = await axios.get(`http://localhost:8080/api/customer/${id}`, {})
    setCustomerName(res.data.data.customerName)
    setCustomerAddress(res.data.data.customerAddress)
    setCustomerNumber(res.data.data.customerNumber)
    setData(res.data.data)
  }

  const updateCustomer = async () => {
    setMessage("")
    setErrorMessage("")
    try {
      if (valid || customerNumber === data.customerNumber) {
        const res = await axios.put(`http://localhost:8080/api/update-customer/${id}`, { customerName, customerAddress, customerNumber })
        console.log(res)
        setMessage(res.data.message)
      } else {
        setErrorMessage("Number is not valid")
      }
    } catch (error) {
      setErrorMessage("Something went wrong")
      console.log(error.message)
    }


  }

  useEffect(() => {
    getCustomerInfo()
  }, [])
  return (
    <div className='add-customer-form'>
    
      <h1>Edit Customer</h1>
      <NumValidationEdit
        edit={true}
        setCustomerAddress={setCustomerAddress}
        setCustomerName={setCustomerName}
        setCustomerNumber={setCustomerNumber}
        customerNumber={customerNumber}
        setValidProps={setValid} />
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
        <button onClick={updateCustomer}>
          Save
        </button>
      </div>
    </div>
  )
}
