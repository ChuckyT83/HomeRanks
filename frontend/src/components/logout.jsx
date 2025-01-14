import React from 'react';
import axios from 'axios';

export const Logout = () => {

   
    try{
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if(accessToken && refreshToken) {
            const config = {
                headers: {
                "Authorization":`Bearer ${accessToken}`}};
            axios.post("http://127.0.0.1:8000/scraperApp/logout/", {"refresh":refreshToken}, config)
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                console.log("Log out successful!")
                window.location.href = '/';
                }}
    catch(error){
        console.error("Failed to logout", error.response?.data || error.message)
    }
    

    return (
        <div className="form-signin mt-5 text-center">
            <p>Logging out...</p>
        </div>
    )}


            // useEffect(() => {
    //     (async () => {
    //             try {
    //                 const {data} = await axios.post(
    //                     'http://localhost:8000/scraperApp/logout', {refresh_token: localStorage.getItem('refresh_token')},
    //                     {headers: {'Content-Type': 'application/json'}}, {withCredentials: true});
    //                 localStorage.clear();
    //                 axios.defaults.headers.common['Authorization'] = null;
    //                 window.location.href = '/login';
    //             }catch (e) {console.log('not authorized')
    //             }})();
    //         }, []);

    //     return (
    //         <div className="form-signin mt-5 text-center">
    //             <p>Logging out...</p>
    //         </div>
    //     )}