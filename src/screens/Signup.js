import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import baseUrl from '../baseUrl';

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
            alert("Enter valid credentials");
        }
        if (msg.success) {
            navigate("/");
        }
    }

    const onchange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <Navbar />
            <div className='d-flex justify-content-center mx-2'>
                <div className='border p-4 mt-3 shadow-sm'>

                    <form onSubmit={handlesubmit}>
                        <h1 className='text-center'>SignUp</h1>
                        <div className="form-group my-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name' value={credentials.name} onChange={onchange} className="form-control" placeholder="Enter name" />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" name='email' value={credentials.email} onChange={onchange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name='password' value={credentials.password} onChange={onchange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="exampleInputPassword1">Address</label>
                            <input type="text" name='geolocation' value={credentials.geolocaton} onChange={onchange} className="form-control" id="exampleInputPassword" placeholder="Address" />
                        </div>
                        <button type="submit" className="m-3 btn btn-success">Submit</button>
                        <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                    </form>
                </div>
            </div>
            <Footer />
        </div>

    )
}
