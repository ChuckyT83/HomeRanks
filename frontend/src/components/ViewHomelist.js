import React, { useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';



const HomeList = () => {
    const [homelist, setHomelist] = useState([]);
    const [searchParams] = useSearchParams();
    const [badListName, setBadListName] = useState(false);
    const [isNewList, setIsNewList] = useState(false);



    
    useEffect( () => {
    if (searchParams.get('list_name') === null) {
        setBadListName(true);
    }
    else {
        if (searchParams.get('new_list') === 'true') {
            setIsNewList(true);
        }
        (async () => {

        await axios.get('http://localhost:8000/scraperApp/homelist', {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}, params: {list_name: searchParams.get('list_name')}})
        .then(res => {
            setHomelist(res.data);
            if (res.data.length === 0) {
                setBadListName(true);
            }
        }).catch(function (){
            setBadListName(true);
        });})()
    }},[]);
    
        
    


    return (
    <div>
        {isNewList ? (<h1>Successfully created new list! loading.</h1>) : null} 
        {badListName ? (

            <h1>Empty list or Bad List Name. Please try again.</h1>
            
        ) : (

        <ul>
            {homelist.map(home => (
                
                <li key={home.id}>
                {<img src={"http://127.0.0.1:8000"+home.thumbnail} alt={home.address+" thumbnail"} className="thumbnail" />}
                    {home.address} {home.price} | {home.status}
                </li>
                ))}      
        </ul> 

        )}
    </div>)
};


export default HomeList;