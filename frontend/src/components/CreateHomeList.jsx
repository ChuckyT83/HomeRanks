import React, {useState, useEffect, useCallback} from 'react';
import {axiosInstance} from './axiosInstance';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AdvancedMarker, APIProvider, Map, Pin, InfoWindow} from '@vis.gl/react-google-maps';
import { Button, Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';



export const CreateHomeList = () => {
    const navigate = useNavigate(); 
    const [position, setPositionState] = useState({lat: 40.556480, lng: -85.682770});
    const [positionNW, setPositionStateNW] = useState({lat: 40.556480, lng: -85.742770});
    const [positionSE, setPositionStateSE] = useState({lat: 40.556480, lng: -85.622770});
    const [loadedKey, setLoadedKey] = useState(false);
    const [GoogleMapsAPIKey, setGoogleMapsAPIKey] = useState('');
    const [newSearch, setNewSearch] = useState({
        name: '',
        west_cord: '',
        east_cord: '',
        north_cord: '',
        south_cord: '',
        max_price: '',
        min_beds: '',
        min_baths: '',
        min_acres: '',
        keywords: '',
        user: '',
    });

    useEffect(() => {axiosInstance.get('/getKey/1', {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}}).then(res => 
        {setGoogleMapsAPIKey(res.data.key)
        setLoadedKey(true)
    })})

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axiosInstance({
            method: 'POST',
            url: 'http://127.0.0.1:8000/scraperApp/homelist/', 
            // headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`},
            data: newSearch}).then(
                await navigate('/homelist/view/?list_name=' + newSearch.name + '&new_list=true')
            )
            .catch(console.log("error"));}

    const dragSE = (event) => {
        console.log(event.latLng.lat(), event.latLng.lng())
        setNewSearch({...newSearch, south_cord: event.latLng.lat(), east_cord: event.latLng.lng()})
    }    

    const dragNW = (event) => {
        console.log(event.latLng.lat(), event.latLng.lng())
        setNewSearch({...newSearch, west_cord: event.latLng.lng(), north_cord: event.latLng.lat()})

    }
    


        
    
        

    
    return (
        <Box>
            <Grid container sx={{justifyContent: 'center', alignItems: 'flex-start'}}>
            <Box className="map-container" id="map" sx={{}}>                     
                {loadedKey && <APIProvider apiKey={GoogleMapsAPIKey}>
                    <Map 
                        style={{width: 450, height: 400, minWidth: 250, minHeight: 200, 
                        borderTop:"0px solid",
                        borderBottom:"2px solid",
                        borderLeft:"2px solid",
                        borderRight:"2px solid",
                    }}
                        defaultCenter={position} 
                        defaultZoom={10}      
                        mapId="get-coords"
                        position={position}
                        disableDefaultUI={true}
                    
                    >
                        <AdvancedMarker
                            className="nw-marker" 
                            position={positionNW}
                            draggable={true}
                            onDragEnd={dragNW}
                            style={{border: "0px !important"}}>
                            <Pin background={'#FFBC04'} glyphColor={'#000'} borderColor={'#000'}/>
                        </AdvancedMarker>
                        <AdvancedMarker
                            className="se-marker"
                            position={positionSE}
                            draggable={true}
                            onDragEnd={dragSE}>
                            <Pin background={'#00BCff'} glyphColor={'#000'} borderColor={'#000'}/>
                        </AdvancedMarker>
                        <InfoWindow position={position} pixelOffset={[0,-50]} maxWidth={200}>
                            Place the yellow pin to the top left (North West) and blue pin to bottom right (South East) to set coordinates.
                            </InfoWindow>
                    </Map>
                </APIProvider>}
                
            </Box>
            </Grid>
            <Grid component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '22ch' }, margin: 1, display: "flow", justifyContent: "center" }}  onSubmit={handleSubmit}> 
                <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}><h2>Create a New Home List</h2></Box>
                <Grid sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', columnCount: 3, flexWrap: "wrap"}}>
                
                <TextField label="List Name" type="text" name="name" onChange={(e) => setNewSearch({...newSearch, name: e.target.value})}/>
                <TextField label="West Coordinate" type="text" name="west_cord" value={newSearch.west_cord} onChange={(e) => setNewSearch({...newSearch, west_cord: e.target.value})}/>
                <TextField label="North Coordinate" type="text" name="north_cord" value={newSearch.north_cord} onChange={(e) => setNewSearch({...newSearch, north_cord: e.target.value})}/>
                <TextField label="East Coordinate" type="text" name="east_cord" value={newSearch.east_cord} onChange={(e) => setNewSearch({...newSearch, east_cord: e.target.value})} />
                <TextField label="South Coordinate" type="text" name="south_cord" value={newSearch.south_cord} onChange={(e) => setNewSearch({...newSearch, south_cord: e.target.value})}/>
                <TextField label="Max Price" type="text" name="max_price" onChange={(e) => setNewSearch({...newSearch, max_price: e.target.value})} />
                <TextField label="Minimum Bedrooms" type="text" name="min_beds" onChange={(e) => setNewSearch({...newSearch, min_beds: e.target.value})} />
                <TextField label="Minimum Bathrooms" type="text" name="min_baths" onChange={(e) => setNewSearch({...newSearch, min_baths: e.target.value})} />
                <TextField label="Minimum Acreage" type="text" name="min_acres" onChange={(e) => setNewSearch({...newSearch, min_acres: e.target.value})} />
                {/* <TextField label="Key Words" type="text" name="keywords" onChange={(e) => setNewSearch({...newSearch, keywords: e.target.value})} /> */}
                </Grid>
                <Box sx={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                <Button variant="contained" type="submit">Submit</Button>
                </Box>
            </Grid>
            <br/><br/>
            <div id="map"></div>
 
        </Box>
        
    )
}

