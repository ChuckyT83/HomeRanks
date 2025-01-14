
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, { useState, useEffect } from 'react'
import { DownCircleOutlined } from '@ant-design/icons'
import {HomeOutlined, MehTwoTone} from '@ant-design/icons'
import { Menu } from 'antd'
import {useNavigate, Link} from 'react-router-dom'





export default function NavBar() {

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">Scraper</Navbar.Brand>
            <Nav className="me-auto">
                {isAuth ? <Nav.Link href=''>Home</Nav.Link>: null}
            </Nav>
            <Nav className="me-auto">
                {isAuth ? 
                  <NavDropdown title="HomeList" id="basic-nav-dropdown"><DownCircleOutlined />

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

// export default function NavBar() {
//   const items = [
//     {
//       label: 'Home Rank',
//       key: '/',
//       icon: <MehTwoTone/>,
//       disabled: true,
//     },
//     {
//       label: 'Home List',
//       key: 'SubMenu',
//       icon: <HomeOutlined />,
//       children: [
//         {
//           children: [
//             {
//               label: 'Select List',
//               key: '/homelist/select/',
//             },
//             {
//               label: 'Create List',
//               key: '/homelist/create/',
//             },
//           ],
//         }
//       ],
//     },
//   ];

  
//   const navigate = useNavigate();
//   const onClick = ({ key }) => {
//     const { target } = items.find(item => item.key === key) || {};
//     if (target) {
//       navigate(target);
//     }
//   };
//   return (<Menu items={items} onClick={(menuItem) => navigate(menuItem.key)}/>)
// };


