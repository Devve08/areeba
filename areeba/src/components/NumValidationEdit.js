import React, { useEffect } from 'react'
import { useState } from 'react';

export default function NumValidationInput({ edit, customerNumber, setCustomerNumber, setCustomerName, setCustomerAddress, setValidProps }) {
    const access_key = "2e145ef25576ed13521ef9d6a65a93b7"
    const [number, setNumber] = useState(null)
    const [valid, setValid] = useState(null)

    
    const verifyNumber = async () => {
        {console.log(customerNumber)}
        let res = await fetch(`http://apilayer.net/api/validate?access_key=${access_key}&number=${customerNumber}`)
        let result = await res.json()
        setValid(result.valid)
        setValidProps(result.valid)
        console.log(result)
    }

    
    return (
        <div className='phone-input-container'>
        
            <input value={customerNumber} placeholder='Phone number'
                onChange={(e) => {
                    setCustomerNumber(e.target.value)
                }} onBlur={verifyNumber} className={valid ? "phone-input validation-true" : valid === false ? "phone-input validation-false" : "phone-input"} type={"number"} />
            <span style={{ color: valid ? "green" : "tomato" }} className='validation-message'>{valid ? "Number is valid" : valid === false ? "Number is not valid" : null}</span>
        </div>
    )
}
