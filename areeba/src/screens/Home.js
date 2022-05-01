import React, { useEffect, useState } from 'react'
import CustomerCard from '../components/CustomerCard'
import { Link } from 'react-router-dom'
import axios from "axios"

export default function Home() {
    const [customers, setCustomers] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [message, setMessage] = useState("")

    const getCustomers = async () => {

        let data = await axios.get("http://localhost:8080/api/customers", {})
        if (data) {
            setCustomers(data.data.data)
        }
    }

    useEffect(() => {
        getCustomers()
    }, [])


    return (
        <div className='home-container'>
            <div className='home-add-btn'>
            <div style={{
                marginRight: "5rem"
            }}>{message && <span style={{ color: "green" }}>{message}</span>}</div>
                
                <Link to={"addCustomer"}>
                    <button>
                        Add New Customer
                    </button>
                </Link>
            </div>
            {customers && customers.map((item, index) => {
                return <CustomerCard
                    getCustomers={getCustomers}
                    setMessage={setMessage}
                    key={index}
                    name={item.customerName}
                    customerID={item._id}
                    address={item.customerAddress}
                    phoneNumber={item.customerNumber} />
            })}

        </div>
    )
}
