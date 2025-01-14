import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';



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
        <div className="container">
            <div className="row mt-5">
            <div className="col-sm-12">
            <h1>Select Home List</h1>
            <form onSubmit={handleSubmit}>
            
                {homeListList.map(list => (
                    <div className="form-check">
                        <label>
                            <input 
                                type="radio"
                                name="homelist"
                                value={list.name}
                                className="form-check-input"
                                onChange={(e) => setSelectedList(e.target.value)}
                            />
                            {list.name} Homes: {list.num_homes} | {list.max_price} {list.min_beds} {list.min_baths} {list.min_acres}
                        </label>
                    </div>  
            ))}
            <button className="btn btn-primary mt-2" type="submit">View</button>      
            </form>
    </div></div></div>)
};


