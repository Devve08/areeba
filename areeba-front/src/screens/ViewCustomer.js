import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from "react-icons/bi"
import { Link, useParams } from 'react-router-dom'

export default function ViewCustomer() {
    const [data, setData] = useState({})

    let {id} = useParams()
    const getCustomerInfo = async () => {
        const res = await axios.get(`http://localhost:8080/api/customer/${id}`,{})
        setData(res.data.data)
    }

    useEffect(()=>{
        getCustomerInfo()
    },[])
    return (
        <div className='view-customer-container'>
            <div className='icon'>
                <Link style={{color: "black"}} to={"/"}>
                    <BiArrowBack size={25} />
                </Link>
            </div>

            <div className='view-customer'>
                <div>
                    <span>Name: </span>
                    {data.customerName}
                </div>
                <div>
                    <span>Address: </span>
                    {data.customerAddress}
                </div>
                <div>
                    <span>Phone Number: </span>
                    {data.customerNumber}
                </div>
            </div>


        </div>
    )
}
