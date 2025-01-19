import React, {useState, useEffect, useCallback} from 'react';
import {axiosInstance} from './axiosInstance';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AdvancedMarker, APIProvider, Map, Pin, InfoWindow} from '@vis.gl/react-google-maps';

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
        <div className="form-signin mt-5 text-center">
            <div className="map-container" id="map">                     
                
                {loadedKey && <APIProvider apiKey={GoogleMapsAPIKey}>
                    <Map 
                        style={{width: 500, height: 400}}
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
                            // ref={nwMarkerRef}
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
                              
            </div>
            <form onSubmit={handleSubmit}> 
                <h1>Create a New Home List</h1>
                <label>List Name</label>
                <input type="text" name="name" onChange={(e) => setNewSearch({...newSearch, name: e.target.value})} />
                <label>West Coordinate</label>
                <input type="text" name="west_cord" value={newSearch.west_cord} onChange={(e) => setNewSearch({...newSearch, west_cord: e.target.value})}/>
                <label>North Coordinate</label>
                <input type="text" name="north_cord" value={newSearch.north_cord} onChange={(e) => setNewSearch({...newSearch, north_cord: e.target.value})}/>
                <label>East Coordinate</label>
                <input type="text" name="east_cord" value={newSearch.east_cord} onChange={(e) => setNewSearch({...newSearch, east_cord: e.target.value})} />
                <label>South Coordinate</label>
                <input type="text" name="south_cord" value={newSearch.south_cord} onChange={(e) => setNewSearch({...newSearch, south_cord: e.target.value})}/>
                <label>Max Price</label>
                <input type="text" name="max_price" onChange={(e) => setNewSearch({...newSearch, max_price: e.target.value})} />
                <label>Min Beds</label>
                <input type="text" name="min_beds" onChange={(e) => setNewSearch({...newSearch, min_beds: e.target.value})} />
                <label>Min Baths</label>
                <input type="text" name="min_baths" onChange={(e) => setNewSearch({...newSearch, min_baths: e.target.value})} />
                <label>Min Acres</label>
                <input type="text" name="min_acres" onChange={(e) => setNewSearch({...newSearch, min_acres: e.target.value})} />
                <label>Key Words</label>
                <input type="text" name="keywords" onChange={(e) => setNewSearch({...newSearch, keywords: e.target.value})} />
             
                
                <button className="btn-primary btn mt-2" type="submit">Submit</button>
            </form>
            <br/><br/>
            <div id="map"></div>
 
        </div>
        
    )
}

