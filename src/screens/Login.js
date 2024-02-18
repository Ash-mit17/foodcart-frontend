import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import baseUrl from '../baseUrl';

export default function Login() {

  const [credentials, setcredentials] = useState({ password: "", email: "" })
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })

    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))

    const msg = await response.json();
    // console.log("msg is"+msg.success)
    if (!msg.success) {
      alert("Enter valid credentials");
    }

    if (msg.success) {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", msg.authToken)
      navigate("/");
    }
  }

  const onchange = (event) => {
    // console.log([event.target.name]);
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div style={{"backgroundColor":"black"}}>
      <div className='container' style={{ "display": "flex", "justifyContent": "center", "alignContent": "center", "margin": "10% 0", "backgroundColor": "black", "padding": "0","width":"100%" }}>
        <form onSubmit={handlesubmit}>
          <h1 style={{"color":"white"}}>Login</h1>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name='email' value={credentials.email} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name='password' value={credentials.password} onChange={onchange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">I am a new user</Link>
        </form>
      </div>
      </div>

  )
}
