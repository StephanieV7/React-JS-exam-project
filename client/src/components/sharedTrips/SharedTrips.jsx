import * as tripService from '../../services/tripService'
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Stack } from "react-bootstrap";
import TripTemplate from '../tripsList/tripTemplate/TripTemplate';

export default function SharedTrips() {
    const [sharedTrips, setSharedTrips] = useState([]);

    const { email } = useContext(AuthContext)

    useEffect(() => {
        tripService.getSharedTrips(email)
            .then(result => setSharedTrips(result))
    }, [])

    return (
        <>



            {sharedTrips.length > 0
                ? <Stack gap={3}>
                    {
                        sharedTrips.map(trip => <TripTemplate key={trip._id} {...trip} />)
                    }

                </Stack>
                : <p>No shared trips.</p>}


        </>

    )
}