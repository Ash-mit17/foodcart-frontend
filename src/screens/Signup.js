import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../baseUrl';
import { Button } from '@mui/material';
import { notifySuccess, notifyWarning } from '../components/toast';

export default function Signup() {

    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", password: "", email: "", geolocation: "" })
    // console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }))
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })

        const msg = await response.json();
        if (!msg.success) {
            notifyWarning(msg.message);
        }
        if (msg.success) {
            notifySuccess(`${msg.message} Please login to continue`);
            navigate("/");
        }
    }

    const onchange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border p-4 shadow-sm bg-white rounded" style={{ maxWidth: '400px', width: '100%' }}>
                <form onSubmit={handlesubmit}>
                    <h1 className="text-center mb-4 text-dark">Sign Up</h1>
                    <hr />
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={credentials.name}
                            onChange={onchange}
                            className="form-control"
                            placeholder="Enter name"
                            required
                        />
                    </div>
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
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={onchange}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="exampleInputPassword1">Address</label>
                        <input
                            type="text"
                            name="geolocation"
                            value={credentials.geolocation}
                            onChange={onchange}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Address"
                            required
                        />
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <Button variant="outlined" type='submit' className='mb-3' style={{ maxWidth: "200px" }} color="success">Submit</Button>
                        <Button variant="outlined" style={{ maxWidth: "200px" }} color="error" onClick={() => navigate("/user/login")}>Already a user?</Button>
                    </div>
                </form>
            </div>
        </div>

    )
}
