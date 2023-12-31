import { useContext, useEffect, useState } from "react";
import TripTemplate from "./tripTemplate/TripTemplate"
import * as tripService from '../../services/tripService'
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import AuthContext from '../../contexts/AuthContext';
import styles from './TripsList.module.css'


export default function TripsList() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();
    const { _id: userId } = useContext(AuthContext);

    const [error, setError] = useState(false);

    useEffect(() => {
        tripService.getAll(userId)
            .then(result => setTrips(result))
            .catch(error => {
                if (error.code !== 404) {
                    setError(error)
                }
            })
    }, [])

    const onClickAddTrip = () => {
        navigate('/addTrip')
    }

    return (
        <>
            {error && alert(error)}
            <div className={styles.buttonContainer}>
                <Button className={styles.addTripButton} variant="outline-info" onClick={onClickAddTrip}>Add new trip</Button>

            </div>

            <div className={styles.mainContainer}>
                {trips.length > 0
                    ? <Stack direction="horizontal" gap={3}>
                        {
                            trips.map(trip => <TripTemplate key={trip._id} {...trip} />)
                        }

                    </Stack>
                    : <h2>No added trips.</h2>
                }
            </div>

        </>

    )
}