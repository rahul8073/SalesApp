import axios from 'axios'
//import react hooks
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Navbars from '../components/navbar'

const Total_revenue = () => {
    const [data, setData] = useState([])
    let sum = 0;
    //useEffect Hook allows you to perform side effects in our components. 
    useEffect(() => {
        //get the data in database
        axios.get("http://localhost:5000/totalrevenue")
            .then(result => {
                setData(result.data.result);
            }) 
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: err
                })
            })
    }, [])
    data.map(d => { sum += Number(d.amount) });
    console.log(sum);
    return (
        // total revenue header and show data
        <div>
            <Navbars />
            <div className='d-flex justify-content-center'>
                <div className='my-4 w-75'>
                    <h3 className='text-center text-uppercase'>Today's revenue is {sum} </h3>
                </div>
            </div>
        </div>
    )
}

export default Total_revenue