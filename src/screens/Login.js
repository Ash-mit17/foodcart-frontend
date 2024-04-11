import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import baseUrl from '../baseUrl';
import { notifyError, notifyWarning } from '../components/toast';

export default function Login() {

  const [credentials, setcredentials] = useState({ password: "", email: "" })
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      })
  
      const msg = await response.json();
      if (!response.ok) {
        notifyWarning("Invalid credentials")
      }
  
      if (msg.success) {
        localStorage.setItem("userEmail", credentials.email)
        localStorage.setItem("authToken", msg.data.authToken)
        localStorage.setItem("username", msg.data.username)
        navigate("/");
      }
    }
    catch(error){
      notifyError(error.message);
    }
  }

  const onchange = (event) => {
    // console.log([event.target.name]);
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <Navbar />
      <div className='d-flex justify-content-center'>
        <div className="border p-4 mt-3 shadow-sm">
          <form onSubmit={handlesubmit}>
            <h1 className='text-center mb-2'>Login</h1>
            <hr />
            <div className="form-group my-3">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" name='email' value={credentials.email} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group my-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" name='password' value={credentials.password} onChange={onchange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/user/signup" className="m-3 btn btn-danger">I am a new user</Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>

  )
}
