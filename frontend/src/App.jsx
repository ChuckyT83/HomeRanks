import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import HomeList from './components/ViewHomelist';
import {CreateHomeList} from './components/CreateHomeList';
import {Login} from './components/login';
import {Logout} from './components/logout';
import {Home} from './components/Home';
import {SelectHomeList} from './components/SelectHomeList';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { ToastContainer } from 'react-toastify';



const App = () => {
  return (
    
    <Router>
      <NavBar/>
      <Routes>
      
        <Route path="" element={<Home/>} />
        <Route path="login/" element={<Login/>} />
        <Route path="homelist/view" element={<HomeList/>} />
        <Route path="homelist/create" element={<CreateHomeList/>} />
        <Route path="homelist/select" element={<SelectHomeList/>} />
        <Route path="logout" element={<Logout/>} />
      </Routes>
      {/*<ToastContainer hideProgressBar={true} newestOnTop={true}/>*/}
    </Router>
    
  );
}

export default App;
