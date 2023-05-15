import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {

    const [cartView,setCartView] = useState(false);
    let data = useCart();
    const navigate = useNavigate();
    
    const handleLogout = ()=>{
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
                <Link className="navbar-brand fs-1 fst-italics" to="/">Comfort Food</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className='navnar-nav me-auto mb-2' style={{"list-style":"none"}}>
                        <li className='nav-item'>
                            <Link className="nav-link fs-6 active" to="/"><span style={{"fontSize":"2rem","margin":"7px 0","color":"white"}}>Home</span></Link>
                        </li>
                        {(localStorage.getItem("authToken"))?
                        <li className='nav-item'>
                        <Link className="nav-link fs-6 active" to="/myOrderData"><span style={{"fontSize":"2rem","margin":"7px 0","color":"white"}}>My Orders</span></Link>
                        </li>
                        : ""}
                    </ul>  
                    {(!localStorage.getItem("authToken"))?
                    <div className='d-flex'>
                        <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                        <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                    </div>
                    : 
                        <div>
                        <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>Logout</div>
                        <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                            MyCart{" "}
                            <span class="badge bg-secondary">{data.length}</span>
                        </div>
                        {cartView ? <Modal onClose={()=>{setCartView(false)}}><Cart></Cart></Modal>:null}
                        </div>
                      }
                </div>
            </nav>
        </div>
    )
}
