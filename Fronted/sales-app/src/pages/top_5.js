import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbars from '../components/navbar'

const Top_5 = () => {
    const [data, setData] = useState([])
    let records = [];
    //useEffect Hook allows you to perform side effects in our components. 
    useEffect(() => {
        //get the data in database
        axios.get("http://localhost:5000/top5")
            .then(result => {
                setData(result.data.result);
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: err
                })
            })
    }, []);
    //only top 5 data store in records array
    data.map((d, k) => {
        if (k < 5)
            records.push(d)
    })
    return (
        // create top 5 sale table and show data through map method
        <div>
            <Navbars />
            <div className='d-flex justify-content-center'>
                <div className='mt-4 w-75'>
                    <h1 className='text-center text-uppercase my-4'>top 5 sale</h1>
                    <table className='table  my-3 shadow'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Sales Id:</th>
                                <th scope='col'>Product Name</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Sale Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((r, key) => <tr>
                                <td>{key}</td>
                                <td>{r._id}</td>
                                <td>{r.productName}</td>
                                <td>{r.quantity}</td>
                                <td>{r.amount}</td>

                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Top_5