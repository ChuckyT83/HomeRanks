import {useEffect} from 'react';
import axios from 'axios';

export const Home = () => {

    

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login';}
        else{
            (async () => {
                try {
                    await axios.get(
                        'http://localhost:8000/home', 
                    {headers: {'Content-Type': 'application/json'}});
                
            }catch (e) {console.log('not authorized')
            }})()};

        }, []);

    return (
        <div>
            <p>Welcome</p> Select
        </div>
    )
}