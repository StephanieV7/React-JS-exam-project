import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Button } from "react-bootstrap";
//import GoogleMapComponent from "./addMoreDetails/GoogleMaps";
import styles from './TripDetails.module.css'
import * as sharedService from '../../services/sharedService';


export default function TripDetails() {
    const [trip, setTrip] = useState({});

    const { _id } = useParams();

    // const checkUser = async () => {
    //     const response = await fetch(`http://localhost:3030/users/me`, { method: 'GET', headers: {
    //         'X-Authorization': localStorage.getItem('accessToken')
    //     } })
    //     const data = await response.json();
    //     console.log(data);
    // }
    const data = {title: 'Asia', destinations: [{destination: 'Japan', startDate: '2023-11-28', endDate: '2023-12-01'}], shared: ['peter@abv.bg', 'stephanie@abv.bg']}

    useEffect(() => {
        tripService.getOne(_id)
            .then(result => setTrip(result));
    }, [_id]);


    const shareHandler = async () => {
        
          
            const result = await sharedService.create(data);
            console.log(result);
          
        
    }


    return (
        <div>
            <h1>{trip.title} details</h1>

            <div className={styles.buttonContainer}>
                <Button className={styles.addTripButton} variant="outline-info">Edit/ Update</Button> {' '}
                <Button className={styles.addTripButton} variant="outline-info" onClick={shareHandler}>Share</Button>{' '}

            </div>
            {/* <div>
                <h1>My React Google Maps App</h1>
                <GoogleMapComponent />
            </div> */}
            <div>
                <h1>Destination: {trip.destinations[0].destination}</h1>
                <p>Start date: {trip.destinations[0].startDate}</p>
                <p>End date: {trip.destinations[0].endDate}</p>
            </div>

        </div>

    )
}