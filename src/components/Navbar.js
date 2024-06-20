import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



export default function ResponsiveNavbar() {

    const [cartView, setCartView] = useState(false);
    let data = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/user/login");
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary bg-warning">
          <Container>
            <Navbar.Brand className='fs-2 fst-italic' href="/">Comfort Food</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Button className='btn bg-white text-success mx-1 p-1 ' variant='contained' onClick={() => { navigate("/") }}>Home</Button>
                {localStorage.getItem("authToken") && <Button className='btn bg-white text-success mx-1 p-1 ' variant='contained' onClick={() => { navigate("/data/myOrderData") }}>My Orders</Button>}
              </Nav>
              {localStorage.getItem("authToken") ? (
                <Nav>
                <Badge className='mx-2 my-1' bg="secondary"><h5>{localStorage.getItem("username")}</h5></Badge>
                <Button className='btn bg-white text-danger mx-1 p-1 my-1' onClick={() => { handleLogout() }}><LogoutIcon /></Button>
                <div className='btn bg-white text-success mx-2 p-1 my-1' onClick={() => { setCartView(true) }}>
                                <ShoppingCartIcon />
                        <span class="badge bg-secondary">{data.length}</span>
                </div>
                {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart></Cart></Modal> : null}
              </Nav>
              ):
              <Nav>
                <Link className="btn bg-white text-success mx-1 p-1" to={"/user/login"}>Login</Link>
                <Link className="btn bg-white text-success mx-1 p-1" to={"/user/signup"}>SignUp</Link>
              </Nav>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ); 
}
