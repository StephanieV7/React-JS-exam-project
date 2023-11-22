import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Button } from "react-bootstrap";
//import GoogleMapComponent from "./addMoreDetails/GoogleMaps";


export default function TripDetails() {
    const [trip, setTrip] = useState({});

    const { _id } = useParams();


    useEffect(() => {
        tripService.getOne(_id)
            .then(result => setTrip(result));
    }, [_id]);

    return (
        <div>
            <h1>{trip.title} details</h1>

            <div className="button-container">
                <Button className='add-trip-button' variant="outline-info">Add more details</Button>{' '}
                <Button className='add-trip-button' variant="outline-info">Share</Button>{' '}

            </div>
            {/* <div>
                <h1>My React Google Maps App</h1>
                <GoogleMapComponent />
            </div> */}
            <div>
                <h1>Destination: {trip.destination}</h1>
                <p>Start date: {trip.startDate}</p>
                <p>End date: {trip.endDate}</p>
            </div>

        </div>

    )
}