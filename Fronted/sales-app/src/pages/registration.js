import axios from 'axios';
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import HomeNavbar from '../components/homeNavbar';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  //initialize navigate it is use redirect another api
  const navigate=useNavigate();
  const requestData = { firstName, lastName, email, password };
  const signup = (e) => {
    e.preventDefault();
    //axios post method to send data in database callback function
    axios.post("http://localhost:5000/signup", requestData)
      .then(result => {
        if (result.status === 200) {
          Swal.fire({
            icon: "success",
            title: result.data.result
          })
          navigate('/')
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
    // create registration form using bootstrap classes
    <div>
      <HomeNavbar />
      <div className='d-flex justify-content-center'>
        <div className='mt-3 w-75'>
          <h3 className='text-center text-uppercase'>registration form</h3>
          <form className='form mt-3 shadow p-3' onSubmit={signup}>
            <label className='form-label text-muted'>First Name</label>
            <input type='text' className='form-control' value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <label className='form-label text-muted'>Last Name</label>
            <input type='text' className='form-control' value={lastName} onChange={e => setLastName(e.target.value)} required />
            <label className='form-label text-muted'>Email</label>
            <input type='email' className='form-control' value={email} onChange={e => setemail(e.target.value)} required />
            <label className='form-label text-muted'>Password</label>
            <input type='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} required />
            <div className='d-grid my-4'>
              <button type='submit' className='btn btn-primary'>Signup</button>
            </div>
            <div className='my-4'>
              <hr className='text-muted' />
              <h5 className='text-muted text-center'>OR</h5>
              <hr className='text-muted' />
            </div>
            <div className='mt-3 mb-5 d-grid'>
              <button className="custom-btn custom-btn-white border-0">
                <span className='text-muted fs-6'>Already have an account?</span>
                <Link to="/login" className='ms-1 text-info fw-bold'>Log In</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Registration