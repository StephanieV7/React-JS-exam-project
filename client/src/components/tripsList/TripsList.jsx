import { useContext, useEffect, useState } from "react";
import TripTemplate from "./tripTemplate/TripTemplate"
import * as tripService from '../../services/tripService'
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import AuthContext from '../../contexts/AuthContext';
import styles from './TripsList.module.css'


export default function AllTrips() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();
    const {_id} = useContext(AuthContext)
    console.log(_id);
    useEffect(() => {
        tripService.getAll(_id)
            .then(result => {
                const filteredResult = result.filter((trip)=> trip._ownerId == _id) //it works, but make it more efficient - no need to fetch all trips, just fetch by id
                setTrips(filteredResult)
            })
    }, [])
    
    const onClickAddTrip = () => {
        navigate('/addTrip')
    }

    return (
        <>

            <div className={styles.buttonContainer}>
                <Button className={styles.addTripButton} variant="outline-info" onClick={onClickAddTrip}>Add new trip</Button>{' '}

            </div>

            <div className={styles.mainContainer}>
                <Stack gap={3}>
                    {
                        trips.map(trip => <TripTemplate key={trip._id} {...trip} />)
                    }

                </Stack>

            </div>

        </>

    )
}