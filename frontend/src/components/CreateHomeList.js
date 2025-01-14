import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';

export const CreateHomeList = () => {
    const navigate = useNavigate();  
    const position = {lat: 53.54992, lng: 10.00678};
    const [homelist, setHomelist] = useState([]);
    const [newSearch, setNewSearch] = useState({
        name: '',
        west_coord: '',
        east_coord: '',
        north_coord: '',
        south_coord: '',
        max_price: '',
        min_beds: '',
        min_baths: '',
        min_acres: '',
        user: '',
    });
    // const [markers, setMarkers] = useState([]);



    // async function initMap() {
    //     // Request needed libraries.
    //     const google = window.google
    //     const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    //     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    //     const map = new Map(document.getElementById("map"), {
    //       center: { lat: 37.39094933041195, lng: -122.02503913145092 },
    //       zoom: 14,
    //       mapId: "get-coords",
    //     });
    //     const infoWindow = new InfoWindow();
    //     const draggableMarker = new AdvancedMarkerElement({
    //       map,
    //       position: { lat: 37.39094933041195, lng: -122.02503913145092 },
    //       gmpDraggable: true,
    //       title: "This marker is draggable.",
    //     });
      
    //     draggableMarker.addListener("dragend", (event) => {
    //       const position = draggableMarker.position;
      
    //       infoWindow.close();
    //       infoWindow.setContent(`Pin dropped at: ${position.lat}, ${position.lng}`);
    //       infoWindow.open(draggableMarker.map, draggableMarker);
    //     });
    //   }
    // const getNewHomeList = async () => {  
    //     await axios.get('http://localhost:8000/scraperApp/homelist', {headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`}, params: {list_name: "Test List"}})
    //     .then(res => {
    //         setHomelist(res.data);
    //     });}
      


    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/scraperApp/homelist/', 
            headers: {Authorization: `Bearer ${localStorage.getItem('access_token')}`},
            data: newSearch}).then(
                await navigate('/homelist/view/?list_name=' + newSearch.name + '&new_list=true')
            )
            .catch(console.log("error"));}
        
        
        
    
        

    
    return (
        <div className="form-signin mt-5 text-center">
      
        <div className="map-container" id="map"> 
                <APIProvider apiKey={'AIzaSyCHm5RXJpZnhEn-PbQD33q4ml3-1FN38Ds'}>
                    <Map 
                    style={{width: 300, height: 300}}
                    defaultCenter={position} 
                    defaultZoom={10}      
                    mapId="get-coords"
                    >
                    <AdvancedMarker position={position}/>
                    </Map>

                </APIProvider> </div>           
            <form onSubmit={handleSubmit}> 
                <h1>Create a New Home List</h1>
                <label>List Name</label>
                <input type="text" name="name" onChange={(e) => setNewSearch({...newSearch, name: e.target.value})} />
                <label>West Coordinate</label>
                <input type="text" name="west_coord" onChange={(e) => setNewSearch({...newSearch, west_coord: e.target.value})} />
                <label>East Coordinate</label>
                <input type="text" name="east_coord" onChange={(e) => setNewSearch({...newSearch, east_coord: e.target.value})} />
                <label>North Coordinate</label>
                <input type="text" name="north_coord" onChange={(e) => setNewSearch({...newSearch, north_coord: e.target.value})} />
                <label>South Coordinate</label>
                <input type="text" name="south_coord" onChange={(e) => setNewSearch({...newSearch, south_coord: e.target.value})} />
                <label>Max Price</label>
                <input type="text" name="max_price" onChange={(e) => setNewSearch({...newSearch, max_price: e.target.value})} />
                <label>Min Beds</label>
                <input type="text" name="min_beds" onChange={(e) => setNewSearch({...newSearch, min_beds: e.target.value})} />
                <label>Min Baths</label>
                <input type="text" name="min_baths" onChange={(e) => setNewSearch({...newSearch, min_baths: e.target.value})} />
                <label>Min Acres</label>
                <input type="text" name="min_acres" onChange={(e) => setNewSearch({...newSearch, min_acres: e.target.value})} />
                
                <button className="btn-primary btn mt-2" type="submit">Submit</button>
            </form>
            <br/><br/>
            <div id="map"></div>
 
        </div>
        
    )
}