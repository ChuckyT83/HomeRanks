import React, { useState, useEffect, setState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {axiosInstance} from './axiosInstance';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';



const HomeList = () => {
    const [homelist, setHomelist] = useState([]);
    const [searchParams] = useSearchParams();
    const [badListName, setBadListName] = useState(false);
    const [isNewList, setIsNewList] = useState(false);




    const handleRating = (event, rating) => { axiosInstance.patch(`home/${event.target.name}/`, {preRating: rating})
        .then(res =>
            {
            console.log(rating, event.target.name, res.id)
            const eventId = Number(event.target.name)
            const updateList = [...homelist]
            const home = updateList.find(h => h.id === eventId)
            home.preRating = rating
            setHomelist(updateList)}
        )
        }
        

    
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
    
    useEffect((event) => {})
        
    


    return (
    <div>
        {isNewList ? (<h1>Successfully created new list! loading.</h1>) : null} 
        {badListName ? (

            <h1>Empty list or Bad List Name. Please try again.</h1>
            
        ) : (

        <ListGroup varient="flush">
            {homelist.map(home => (

                <ListGroup.Item varient="info">
                    <Row>
                        <Col sm={3}>
                            <Container eventKey={home.id} key={home.id}>
                                <figure className="position-relative">
                                    <img src={"http://127.0.0.1:8000"+home.thumbnail} alt={home.address+" thumbnail"} className="img-fluid"/>
                                    <figcaption>
                                        <Stack spacing={.5}>
                                            <Rating style={{opacity: 200}} size="large" name={home.id} precision={0.5} value={home.preRating} onChange={(event, rating) => handleRating(event, rating)}/>
                                        </Stack>
                                    </figcaption>
                                <a href={home.homeUrl} target="_blank" rel="noopener noreferrer">{home.address}</a>
                                </figure>
                            </Container>
                        </Col>
                        <Col>
                            <Row>
                                ${home.price} - Acres: {(home.lot_size  / 43560).toFixed(2)} Square Feet: {home.sqft} Bedrooms: {home.bedrooms} Bathrooms: {home.bathrooms} Heating: {home.heating} Cooling: {home.cooling}
                            </Row>
                            <Row> 
                                {home.status} | Days on market: {home.days_on_market} <div>{home.description}</div>
                            </Row>
                        </Col>
                    </Row>
                </ListGroup.Item>
                
                ))}      
        </ListGroup> 

        )}
    </div>)
};


export default HomeList;