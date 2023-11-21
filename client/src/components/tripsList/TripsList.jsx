import { useEffect, useState } from "react";
import TripTemplate from "./tripTemplate/TripTemplate"
import * as tripService from '../../services/tripService'
import { useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";


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
           <Button variant="outline-info" onClick={onClickAddTrip}>Add trip</Button>{' '}
            

            <div className="all-trips">
                <ul>
                {
                    trips.map(trip=> <TripTemplate key={trip._id} {...trip} />)
                }
                </ul>
            </div>

        </>

    )
}