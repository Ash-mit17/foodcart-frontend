import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../baseUrl';
import { notifyError, notifyWarning } from '../components/toast';
import { Button } from '@mui/material';

export default function Login() {

  const [credentials, setcredentials] = useState({ password: "", email: "" })
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
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
    catch (error) {
      notifyError(error.message);
    }
  }

  const onchange = (event) => {
    // console.log([event.target.name]);
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className="d-flex justify-content-center mt-5 align-items-center">
      <div className="border p-4 shadow-sm bg-white rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <form onSubmit={handlesubmit}>
          <h1 className="text-center mb-4 text-dark">Login</h1>
          <hr />
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onchange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={onchange}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className='d-flex flex-column align-items-center'>
            <Button variant="outlined" type='submit' className='mb-3' style={{maxWidth:"200px"}} color="success" >Submit</Button>
            <Button variant="outlined" style={{maxWidth:"200px"}} color="error" onClick={() => navigate("/user/signup")}>New user ?</Button>
          </div>
        </form>
      </div>
    </div>


  )
}
