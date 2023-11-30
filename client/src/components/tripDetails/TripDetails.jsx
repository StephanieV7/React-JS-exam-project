import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Button, Alert, Card, Form } from "react-bootstrap";
//import GoogleMapComponent from "./addMoreDetails/GoogleMaps";
import styles from './TripDetails.module.css'
import * as sharedService from '../../services/sharedService';
import AddPassengerInfoModal from "./AddPassengerInfoModal";
import ShareTripModal from "./ShareTripModal";

export default function TripDetails() {
    const [trip, setTrip] = useState({});
    const [loadedTripInfo, setLoadedTripInfo] = useState(false);
    
    const [passengerInfo, setPassengerInfo] = useState('');
    const [show, setShow] = useState(false);
    
    const [showShareTrip, setShowShareTrip] = useState(false);
    const [email, setEmail] = useState('')

    const { _id } = useParams();

    useEffect(() => {

        tripService.getOne(_id)
            .then((result) => {
                setTrip(result);
            })
        sharedService.getPassengerInfo(_id)
            .then(setPassengerInfo);



    }, [_id]);

    useEffect(() => {
        if (trip._id) {
            setLoadedTripInfo(true);
        }

    }, [trip]);


    if (!loadedTripInfo ) {
        return <p>Loading...</p>;
        //add spinner
    }

    const onClickAddPassengerInfo = () => {
        setShow(true)
    }

    const onClickAddPassengerInfoClose = () => {
        setShow(false)
    }

    const onClickSubmitPassengerInfo = (newPassengerInfo) => {
        setPassengerInfo((state) => [...state, newPassengerInfo])
        setShow(false)
    }

    const onShareClickClose = () => {
        setShowShareTrip(false)
    }
    const onShareClick= () => {
        setShowShareTrip(true)
    }


    return (
        <div>
            <h1>{trip.title}</h1>

            <div className={styles.buttonContainer}>
                <Button className={styles.addTripButton} variant="outline-info">Edit/ Update</Button> {' '}

                
                <Button variant="primary" onClick={onShareClick}>Share this trip</Button>
                {showShareTrip && <ShareTripModal show={showShareTrip} tripId={_id} onShareClickClose={onShareClickClose} onShareClick={onShareClick} />}

            </div>
            {/* <div>
                <h1>My React Google Maps App</h1>
                <GoogleMapComponent />
            </div> */}
            <div>

                {trip.destinations.map((d, i) => (
                    <Card key={i}>
                        <Card.Body>Destination {i + 1}: {d.destination}</Card.Body>
                        <Card.Body>Start date: {d.startDate}</Card.Body>
                        <Card.Body>End date: {d.endDate}</Card.Body>
                    </Card>

                ))}

            </div>
            <div>
                <p>Accomodation:</p>
            </div>

            <div>
                {passengerInfo && passengerInfo.map((x, _id) => (
                    <Card key={_id}>
                        <Card.Body>
                            <h3>{x.name}</h3>
                            <p>Arrival date: {x.arrivalDate == '' ? 'no info' : x.arrivalDate}</p>
                            <p>Arrival time: {x.arrivalTime == '' ? 'no info' : x.arrivalTime}</p>
                            <p>Accomodation: {x.accomodation == '' ? 'no info' : x.accomodation}</p>
                            <p>Departure date: {x.departureDate == '' ? 'no info' : x.departureDate}</p>
                            <p>Departure time: {x.departureTime == '' ? 'no info' : x.departureTime}</p>
                        </Card.Body>

                    </Card>
                ))}
            </div>
            <Button variant="primary" onClick={onClickAddPassengerInfo}>Add your info to the trip</Button>
            {show && <AddPassengerInfoModal show={show} tripId={_id} onClickAddPassengerInfoClose={onClickAddPassengerInfoClose} onClickSubmitPassengerInfo={onClickSubmitPassengerInfo} />}

        </div>

    )
}