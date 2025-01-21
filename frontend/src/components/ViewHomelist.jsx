import React, { useState, useEffect, setState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {axiosInstance} from './axiosInstance';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { borderRadius, borders } from '@mui/system';





const HomeList = () => {
    const [homelist, setHomelist] = useState([]);
    const [searchParams] = useSearchParams();
    const [badListName, setBadListName] = useState(false);
    const [isNewList, setIsNewList] = useState(false);
    const [homelistId, setHomelistId] = useState();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
      };

    const handleRating = (event, rating) => { 
        axiosInstance.patch(`homes/${event.target.name}/`, {preRating: rating})
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

    const handleRemove = (event) => {
        axiosInstance.delete('homelist/remove_home/', {data: {home_id: event.target.id, list_name: searchParams.get('list_name')}})
        console.log(event)
        setHomelist(homelist.filter(home => home.id !== Number(event.target.id)))
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

        <List>
            {homelist.sort((a,b) => b.preRating - a.preRating).map(home => (
            <ListItem key={home.id} disablePadding>

                <Box className={home.id}>
                    <Grid container spacing={{xs: 0}} columns={{xs:1, md: 25}} sx={{justifyContent: 'center', alignItems: 'flex-start', 
                    '--Grid-borderWidth': '0px',
                        borderTop: '0px solid',
                        borderLeft: '0 solid',
                        borderBottom: '2px solid',
                        borderColor: 'black',
}}>
                        <Grid container spacing={0} size={{xs:1, md: 7}} direction={"column"} sx={{justifyContent: 'flex-start', alignItems: 'center', margin: 0}}>
                                <figure>
                                    <Box component="img" sx={{width: "100%", maxWidth:550, minWidth:225, margin:0, padding:0, border:"solid black 2px", borderRadius: "5px"}} src={"http://127.0.0.1:8000"+home.thumbnail} alt={home.address+" thumbnail"} />
                                    <figcaption>
                                        <Stack key={home.id} spacing={.5} >
                                            <Rating  size="large" key={home.id} name={home.id} precision={0.5} value={home.preRating} onChange={(event, rating) => handleRating(event, rating)} />
                                        </Stack>
                                    </figcaption><a href={home.homeUrl} target="_blank" rel="noopener noreferrer"></a>
                                </figure>
                        
                            
                                <Button variant="contained" href={home.homeUrl} target="_blank" rel="noopener noreferrer" sx={{marginBottom: 1, marginTop: 0}}>View Listing</Button>
                                <Button variant="contained" sx={{marginBottom: 2}} onClick={handleRemove} id={home.id}>Remove From List</Button>
                        </Grid>
                        <Grid container size="grow" direction={"column"} sx={{justifyContent: 'flex-start', alignItems: 'left', margin: 2}}>
                                <Grid>{home.address}</Grid>
                                <Grid>Price: ${home.price} - Acres: {(home.lot_size  / 43560).toFixed(2)} Square Feet: {home.sqft} Bedrooms: {home.bedrooms} Bathrooms: {home.bathrooms}</Grid>
                                <Grid>Heating: {home.heating} Cooling: {home.cooling}</Grid>
                                <Grid>
                                Status: {home.status} | Days on market: {home.days_on_market} <div>{home.description}</div></Grid>
                                </Grid>
                        </Grid>
                </Box>
            </ListItem>
            ))}
                    
        </List>)} 
    </div>)
};


export default HomeList;