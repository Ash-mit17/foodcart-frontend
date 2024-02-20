import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import Badge from 'react-bootstrap/Badge';



export default function Navbar() {

    const [cartView, setCartView] = useState(false);
    let data = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning px-2 py-4">
                <Link className="navbar-brand fs-2 fst-italic" to="/">Comfort Food</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className='navnar-nav me-auto mb-2' style={{ "listStyle": "none", "display": "flex" }}>
                        {(localStorage.getItem("authToken")) ? (
                            <Button className='mt-2' color='secondary' variant='contained' onClick={() => { navigate("/myOrderData") }}>My Orders</Button>)
                            : ""}
                    </ul>
                    {(!localStorage.getItem("authToken")) ?
                        <><div className='btn bg-white text-info mx-2' onClick={() => { navigate("/"); }}>Home</div><div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-danger mx-1" to="/signup">SignUp</Link>
                        </div></>
                        :
                        <div>
                            <Badge style={{ fontWeight: "600", lineHeight: "16px", whiteSpace: "pre-wrap" }} bg="secondary"><h5>{localStorage.getItem("username")}</h5></Badge>
                            <div className='btn bg-white text-info mx-2' onClick={() => { navigate("/") }}>Home</div>
                            <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
                            <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                                MyCart{" "}
                                <span class="badge bg-secondary">{data.length}</span>
                            </div>
                            {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart></Cart></Modal> : null}
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
}
