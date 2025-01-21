
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Container from '@mui/material/Container';
import { NodeIndexOutlined } from '@ant-design/icons'

export default function NavBar() {

    const [isAuth, setIsAuth] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
  
      setAnchorEl(event.currentTarget);
  
    };
  
  
    const handleClose = () => {
  
      setAnchorEl(null);
  
    };

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        // <Navbar bg="dark" variant="dark" className="navbar navbar-expand-lg navbar-light bg-primary" >
        //     <Navbar.Brand className="navbar-brand" href="#" style={{padding: '5px'}}><div>  Home Rank <i class="bi bi-house-heart-fill"></i></div></Navbar.Brand>
        //     <Nav className="me-auto">
        //         {isAuth ? 
        //           <NavDropdown title="HomeList" id="basic-nav-dropdown">

        //             <NavDropdown.Item href="/homelist/select">Select</NavDropdown.Item>
        //             <NavDropdown.Item href="/homelist/create">Create</NavDropdown.Item>

        //             </NavDropdown>: null}
        //     </Nav>
        //     <Nav>
        //         {isAuth ? <Nav.Link href='/logout'>Logout</Nav.Link> : <Nav.Link href='/login'>Login</Nav.Link>}
        //     </Nav>
        // </Navbar>

 

        <AppBar position="static" sx={{borderBottom: 2, borderColor: "black"}}>
          <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Typography variant="h5" component="div"  
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
              HomeRank <i class="bi bi-house-heart-fill"/>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}} >
              <Button
                size="large"
                aria-label="Home list options"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                disableElevation
                onClick={handleClick}
                color="green"
                sx={{ display: { md: 'none' } }}
                endIcon={<KeyboardArrowDownIcon />}                
              >
                Home Lists
              </Button>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}

                open={Boolean(anchorEl)}
                onClose={handleClose}
                
              >
                <MenuItem><Button href='/homelist/select'>Select List</Button></MenuItem>
                <MenuItem><Button nhref='/homelist/create'>Create List</Button></MenuItem>
              </Menu>
              </Box>
              <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HomeRank <i class="bi bi-house-heart-fill"/></Typography>
              
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}} >
              <Button
                size="large"
                aria-label="Home list options"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                disableElevation
                onClick={handleClick}
                color="green"
                sx={{ display: { xs: 'none', md: 'flex' }, align: 'left' }}
                endIcon={<KeyboardArrowDownIcon />}                
              >
                Home Lists
              </Button>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}

                open={Boolean(anchorEl)}
                onClose={handleClose}
                
              >
                <MenuItem><Button href='/homelist/select'>Select List</Button></MenuItem>
                <MenuItem><Button href='/homelist/create'>Create List</Button></MenuItem>
              </Menu>
              </Box>
             <Box sx={{display: {xs: 'flex'}, justifyContent: 'flex-end'}}>
            <Stack>
            {isAuth ? <Button color="inherit" variant="outlined" href="/logout">Logout</Button> : <Button href="/login" color="inherit" variant="outlined">Login</Button>}
            </Stack>
            </Box> 
            
          </Toolbar>
          </Container>
        </AppBar>


    );
}

