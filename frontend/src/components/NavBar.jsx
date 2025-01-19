
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, { useState, useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom'





export default function NavBar() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <Navbar bg="dark" variant="dark" className="navbar navbar-expand-lg navbar-light bg-primary">
            <Navbar.Brand className="navbar-brand" href="#"><div>  Home Rank <i class="bi bi-house-heart-fill"></i></div></Navbar.Brand>
            <Nav className="nav me-auto">
                {isAuth ? <Nav.Link href=''>Home</Nav.Link>: null}
            </Nav>
            <Nav className="me-auto">
                {isAuth ? 
                  <NavDropdown title="HomeList" id="basic-nav-dropdown">

                    <NavDropdown.Item href="/homelist/select">Select</NavDropdown.Item>
                    <NavDropdown.Item href="/homelist/create">Create</NavDropdown.Item>

                    </NavDropdown>: null}
            </Nav>
            <Nav>
                {isAuth ? <Nav.Link href='/logout'>Logout</Nav.Link> : <Nav.Link href='/login'>Login</Nav.Link>}
            </Nav>
        </Navbar>
    );
}

