// import react from react library and usestate hook
import React, { useState } from 'react';
//import axios to fetch data in mongodb
import axios from 'axios';
//use different kind of alert in npm package
import Swal from 'sweetalert2';
import Navbars from '../components/navbar';


const AddSales = () => {
  const [productName, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const requestData = { productName, quantity, amount };
  const submitSalesForm = e => {
    e.preventDefault();
    //axios to post the data in database
    axios.post('http://localhost:5000/addsales', requestData)
      .then(result => {
        if (result.status === 200) {
          Swal.fire({
            icon: "success",
            title: result.data.result
          })
        }
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: error.response.data.error
        })
      })
  }
  return (
    // create sale entry form
    <div>
      <Navbars />

      <div className='d-flex justify-content-center ' >
        <form className='form my-4 w-75 shadow p-3' onSubmit={submitSalesForm}>
          <h1 className='text-center text-uppercase mb-5'>add sale entry</h1>
          <label className='form-label text-muted '>Product Name</label>
          <input type='text' className='form-control mb-3' value={productName} onChange={e => setProduct(e.target.value)} />
          <label className='form-label text-muted'>Quantity</label>
          <input type='num' className='form-control mb-3' value={quantity} onChange={e => setQuantity(e.target.value)} />
          <label className='form-label text-muted'>Amount</label>
          <input type='num' className='form-control mb-3' value={amount} onChange={e => setAmount(e.target.value)} />
          <div className='d-grid mt-3'>
            <button type='submit' className='btn btn-primary'>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSales