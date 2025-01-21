import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



export const SelectHomeList = () => {
    const navigate = useNavigate();
    const [homeListList, setHomeListList] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    

  
    useEffect( () => {
        axios.get('http://localhost:8000/scraperApp/selecthomelist', {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}})
        .then(res => {
            setHomeListList(res.data);
        });}, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await navigate('/homelist/view/?list_name=' + selectedList);
    }
        

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',  height: '100vh'}}>
            <h1>Select Home List</h1>
            <form onSubmit={handleSubmit}>
            
                {homeListList.map(list => (
                    <div className="form-check">
                        <label><Box sx={{fontWeight: 'bold'}}>
                            <input 
                                type="radio"
                                name="homelist"
                                value={list.name}
                                className="form-check-input"
                                onChange={(e) => setSelectedList(e.target.value)}
                            />
                            {list.name} | Homes: {list.num_homes}</Box> <Box>Price: {list.max_price} Min Beds: {list.min_beds} Min baths: {list.min_baths} Min Acres: {list.min_acres}</Box>
                        </label>
                    </div>  
            ))}<Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <Button variant="contained" type="submit">View</Button>
            </Box>      
            </form>
    </Box>)
};


