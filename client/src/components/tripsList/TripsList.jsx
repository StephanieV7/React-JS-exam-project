import { useEffect, useState } from "react";
import TripTemplate from "./tripTemplate/TripTemplate"
import * as tripService from '../../services/tripService'
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";


export default function AllTrips(props) {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        tripService.getAll()
            .then(result => setTrips(result))
    }, [])

    const onClickAddTrip = () => {
        navigate('/addTrip')
    }

    return (
        <>

            <div className="button-container">
                <Button className='add-trip-button' variant="outline-info" onClick={onClickAddTrip}>Add new trip</Button>{' '}

            </div>

            <div className="main-container">
                <Stack gap={3}>
                    {
                        trips.map(trip => <TripTemplate key={trip._id} {...trip} />)
                    }

                </Stack>

            </div>

        </>

    )
}