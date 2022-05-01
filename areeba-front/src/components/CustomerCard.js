import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomerCard({ name, address, phoneNumber, customerID, getCustomers, setMessage }) {

    const deleteCustomer = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/delete-customer/${customerID}`)
            console.log(res)
            setMessage(res.data.message)
            getCustomers()
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='card-container'>
            <div className='card-column'>
                <span>{name}</span>
                <span>{address}</span>
                <span>{phoneNumber}</span>
            </div>

            <div className='card-btn'>
                <Link to={`editCustomer/${customerID}`}>
                    <button className='edit'>Edit</button>
                </Link>
                <button onClick={deleteCustomer} className='delete'>Delete</button>
                <Link to={`${customerID}`}>
                    <button className='view'>View</button>
                </Link>
            </div>
        </div>

    )
}
