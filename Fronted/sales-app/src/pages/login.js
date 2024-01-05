import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link,useNavigate} from 'react-router-dom';
import HomeNavbar from '../components/homeNavbar';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const requestData = { email, password };
  const navigate=useNavigate();
  const login = (e) => {
    e.preventDefault();
    //post data in database
    axios.post('http://localhost:5000/login', requestData)
      .then(result => {
        if (result.status === 200) {
          localStorage.setItem("token",result.data.result.token)
          localStorage.setItem("user",JSON.stringify(result.data.result.user))
          Swal.fire({
            icon: 'success',
            title: result.data.result.user.fullName
          })
          navigate("/home")
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error.response.data.error
        })
      })
  }
  return (
    // create login form using bootstrap
    <div>
      <HomeNavbar />
      <div className='d-flex justify-content-center'>
        <div className='mt-3 w-75'>
          <h3 className='text-center text-uppercase'>login form</h3>
          <form className='form mt-3 shadow p-3' onSubmit={(e) => login(e)}>
            <label className='form-label text-muted'>Email</label>
            <input type='email' className='form-control' required value={email} onChange={e => setEmail(e.target.value)} />
            <label className='form-label text-muted'>Password</label>
            <input type='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} required />
            <div className='d-grid my-4'>
              <button type='submit' className='btn btn-primary'>Login</button>
            </div>
            <div className='my-4'>
              <hr className='text-muted' />
              <h5 className='text-muted text-center'>OR</h5>
              <hr className='text-muted' />
            </div>
            <div className='mt-3 mb-5 d-grid'>
              <button className="custom-btn custom-btn-white border-0">
                <span className='text-muted fs-6'>Don't have an account?</span>
                <Link to="/registration" className='ms-1 text-info fw-bold'>Sign Up</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login