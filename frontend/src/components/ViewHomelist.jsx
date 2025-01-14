import React, { useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {axiosInstance} from './axiosInstance';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';  



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
            await axiosInstance.get('homelist/', {params: {list_name: searchParams.get('list_name')}})
        // await axios.get('http://localhost:8000/scraperApp/homelist', {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`},
        //  params: {list_name: searchParams.get('list_name')}})
        .then(res => {
            setHomelist(res.data);
            if (res.data.length === 0) {
                setBadListName(true);
            }
            console.log(res.data);
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

        <ListGroup varient="flush">
            {homelist.map(home => (

                <ListGroup.Item eventKey={home.id}>
                <Row><Col sm={3}>
                <Image src={"http://127.0.0.1:8000"+home.thumbnail} alt={home.address+" thumbnail"} fluid />
                <a href={home.homeUrl} target="_blank" rel="noopener noreferrer">{home.address}</a>
                </Col>
                <Col><Row>
                     ${home.price} - Acres: {(home.lot_size  / 43560).toFixed(2)} Square Feet: {home.sqft} Bedrooms: {home.bedrooms} Bathrooms: {home.bathrooms}</Row><Row> {home.status} <div>{home.description}</div></Row>
                </Col></Row>
                </ListGroup.Item>
                
                ))}      
        </ListGroup> 

        )}
    </div>)
};


export default HomeList;