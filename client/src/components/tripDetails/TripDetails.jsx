import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Button, Card } from "react-bootstrap";
//import GoogleMapComponent from "./addMoreDetails/GoogleMaps";
// import styles from './TripDetails.module.css'
import * as sharedService from '../../services/sharedService';
import AddPassengerInfoModal from "./AddPassengerInfoModal";
import ShareTripModal from "./ShareTripModal";
import DeleteTripModal from "./DeleteTripModal";
import AuthContext from '../../contexts/AuthContext';


export default function TripDetails() {
    const [trip, setTrip] = useState({});
    const [loadedTripInfo, setLoadedTripInfo] = useState(false);

    const [passengerInfo, setPassengerInfo] = useState([]);
    const [show, setShow] = useState(false);

    const [showShareTrip, setShowShareTrip] = useState(false);

    const [showDeleteTrip, setShowDeleteTrip] = useState(false)

    const { _id } = useParams();
    const { _id: userId } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {

        tripService.getOne(_id)
            .then((result) => {
                setTrip(result);
            })

        sharedService.getPassengerInfo(_id)
            .then(setPassengerInfo)

    }, [_id]);

    useEffect(() => {
        if (trip._id) {
            setLoadedTripInfo(true);
        }

    }, [trip]);


    if (!loadedTripInfo) {
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
    const onShareClick = () => {
        setShowShareTrip(true)
    }
    const onDeleteClickClose = () => {
        setShowDeleteTrip(false)
    }
    const onDeleteClick = () => {
        setShowDeleteTrip(true)
    }

    return (
        <div>
            <h1>{trip.title}</h1>

            {trip._ownerId === userId && <div>

                <Button variant="primary" onClick={() => navigate(`/updateTrip/${_id}`)}>Edit/ Update</Button> {" "}
                <Button variant="primary" onClick={onShareClick}>Share this trip</Button> {" "}
                {showShareTrip && <ShareTripModal show={showShareTrip} tripId={_id} onShareClickClose={onShareClickClose} onShareClick={onShareClick} />}
                <Button variant="danger" onClick={onDeleteClick}> Delete this trip</Button> {" "}
                {showDeleteTrip && <DeleteTripModal showDeleteTrip={showDeleteTrip} tripId={_id} onDeleteClickClose={onDeleteClickClose} onDeleteClick={onDeleteClick} />}

            </div>}
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
                        <Card.Body>Accomodation: {d.accomodation}</Card.Body>
                        <Card.Body>Currency: {d.currency}</Card.Body>
                    </Card>

                ))}

            </div>

            <div>
                {passengerInfo.length > 0 && passengerInfo.map((x, _id) => (


                    <Card key={_id} className="custom-card" style={{ width: '18rem' }}>

                        <Card.Body>
                            <Card.Title>{x.name}</Card.Title>

                            <Card.Text>Arrival date: {x.arrivalDate == '' ? 'no info' : x.arrivalDate}</Card.Text>
                            <Card.Text>Arrival time: {x.arrivalTime == '' ? 'no info' : x.arrivalTime}</Card.Text>
                            <Card.Text>Accomodation: {x.accomodation == '' ? 'no info' : x.accomodation}</Card.Text>
                            <Card.Text>Departure date: {x.departureDate == '' ? 'no info' : x.departureDate}</Card.Text>
                            <Card.Text>Departure time: {x.departureTime == '' ? 'no info' : x.departureTime}</Card.Text>
                            <Card.Text>Additional notes: {x.additionalNotes == '' ? 'no info' : x.additionalNotes}</Card.Text>

                        </Card.Body>
                    </Card>




                ))}
            </div>
            <Button variant="primary" onClick={onClickAddPassengerInfo}>Add your info to the trip</Button> {" "}
            {show && <AddPassengerInfoModal show={show} tripId={_id} onClickAddPassengerInfoClose={onClickAddPassengerInfoClose} onClickSubmitPassengerInfo={onClickSubmitPassengerInfo} />}

            {/* <Button variant="danger" onClick={onClickDeleteTrip}>Delete trip</Button> */}
        </div>

    )
}