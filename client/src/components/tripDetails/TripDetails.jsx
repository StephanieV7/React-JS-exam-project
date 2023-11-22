import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as tripService from '../../services/tripService'

export default function TripDetails() {
    const [trip, setTrip] = useState({});

    const { _id } = useParams();


    useEffect(() => {
        tripService.getOne(_id)
            .then(result => setTrip(result));
    }, [_id])

    return (
        <div>
            <h1>{trip.title} details</h1>

            <div>
                <h1>Destination: {trip.destination}</h1>
                <p>Start date: {trip.startDate}</p>
                <p>End date: {trip.endDate}</p>
            </div>

        </div>

    )
}