import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Button, Card } from "react-bootstrap";
//import GoogleMapComponent from "./addMoreDetails/GoogleMaps";
import styles from './TripDetails.module.css'
import * as sharedService from '../../services/sharedService';
import AddPassengerInfoModal from "./AddPassengerInfoModal";
import ShareTripModal from "./ShareTripModal";
import DeleteTripModal from "./DeleteTripModal";
import AuthContext from '../../contexts/AuthContext';
import { formatDate } from "../../utils/dateUtil";
import DeletePassengerInfoModal from "./DeletePassengerInfoModal";
import PassengerInfoContext from '../../contexts/PassengerInfoContext';


export default function TripDetails() {
    const [trip, setTrip] = useState({});
    const [loadedTripInfo, setLoadedTripInfo] = useState(false);

    const [addedInfo, setAddedInfo] = useState(false)

    const [passengerInfo, setPassengerInfo] = useState([]);

    const [showDeletePassengerInfo, setShowDeletePassengerInfo] = useState(false)

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
            .then((result) => {
                setPassengerInfo(result)
            })

    }, [_id]);

    useEffect(() => {
        if (trip._id) {
            setLoadedTripInfo(true);
        }

    }, [trip]);


    if (!loadedTripInfo) {
        return <p>Loading...</p>;
    }

    const onClickAddPassengerInfo = () => {
        setShow(true)
    }

    const onClickAddPassengerInfoClose = () => {
        setShow(false)
    }

    const onClickSubmitPassengerInfo = (newPassengerInfo) => {
        setPassengerInfo((state) => [...state, newPassengerInfo]);
        setAddedInfo(true);
        setShow(false);
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
    const onDeleteInfoClickClose = () => {
        setShowDeletePassengerInfo(false)
    }
    const onDeleteInfoClick = () => {
        setShowDeletePassengerInfo(true);

    }

    const onDeleteSubmit = () => {
        setAddedInfo(false)

    }



    return (

        <div className={styles.details}>
            {trip._ownerId === userId ?
                <div className={styles.buttonContainer}>
                    <Button variant="primary" onClick={() => navigate(`/updateTrip/${_id}`)}>Edit/ Update</Button>
                    <Button variant="primary" onClick={onShareClick}>Share this trip</Button>
                    {showShareTrip && <ShareTripModal show={showShareTrip} tripId={_id} onShareClickClose={onShareClickClose} onShareClick={onShareClick} />}

                    <Button variant="danger" onClick={onDeleteClick}> Delete this trip</Button>
                    {showDeleteTrip && <DeleteTripModal showDeleteTrip={showDeleteTrip} tripId={_id} onDeleteClickClose={onDeleteClickClose} onDeleteClick={onDeleteClick} />}

                </div> :
                <div className={styles.buttonContainer}>

                    {show && <AddPassengerInfoModal show={show} tripId={_id} onClickAddPassengerInfoClose={onClickAddPassengerInfoClose} onClickSubmitPassengerInfo={onClickSubmitPassengerInfo} />}
                    {!addedInfo && <Button variant="primary" onClick={onClickAddPassengerInfo}>Add your info to the trip</Button>}




                </div>


            }




            <h2 className={styles.headlines}>{trip.title}</h2>

            {/* <div>
                <h1>My React Google Maps App</h1>
                <GoogleMapComponent />
            </div> */}
            <div className={styles.mainDetailsContainer}>

                {trip.destinations.map((d, i) => (
                    <Card key={i} >
                        <Card.Body>
                            <span>Destination:</span>
                            <span className={styles.spanValues}> {d.destination}</span>
                        </Card.Body>
                        {d.startDate !== undefined && d.startDate !== '' && <Card.Body>Start date: {formatDate(d.startDate)}</Card.Body>}
                        {d.arrivalTime !== undefined && d.arrivalTime !== "" && <Card.Body>Arrival time: {d.arrivalTime}</Card.Body>}
                        {d.endDate !== undefined && d.endDate !== '' && <Card.Body>End date: {formatDate(d.endDate)}</Card.Body>}
                        {d.departureTime !== undefined && d.departureTime !== "" && <Card.Body>Departure time: {d.departureTime}</Card.Body>}
                        {d.accomodation !== undefined && d.accomodation == "" && <Card.Body>Accomodation: {d.accomodation}</Card.Body>}
                        {d.currency !== undefined && d.currency !== "" && <Card.Body>Currency: {d.currency}</Card.Body>}
                        {d.additionalNotes !== undefined && d.additionalNotes !== "" && <Card.Body>Additional Notes: {d.additionalNotes}</Card.Body>}
                    </Card>

                ))}

            </div>

            <div>
                {passengerInfo.length > 0 ? passengerInfo.map((x, _id) => (

                    <Card key={_id} className="custom-card" style={{ width: '18rem' }}>

                        <Card.Body>
                            <Card.Title>{x.name}</Card.Title>

                            {x.arrivalDate !== '' && <Card.Text>Arrival date: {formatDate(x.arrivalDate)}</Card.Text>}
                            {x.arrivalTime !== '' && <Card.Text>Arrival time: {x.arrivalTime}</Card.Text>}
                            {x.accomodation !== '' && <Card.Text>Accomodation: {x.accomodation}</Card.Text>}
                            {x.departureDate !== '' && <Card.Text>Departure date: {formatDate(x.departureDate)}</Card.Text>}
                            {x.departureTime !== '' && <Card.Text>Departure time: {x.departureTime}</Card.Text>}
                            {x.additionalNotes !== '' && <Card.Text>Additional notes: {x.additionalNotes}</Card.Text>}

                        </Card.Body>
                        <Button variant="danger" onClick={onDeleteInfoClick}> Delete your info</Button>

                        {showDeletePassengerInfo && <DeletePassengerInfoModal showDeletePassengerInfo={showDeletePassengerInfo} passengerInfoId={passengerInfo[0]._id} onDeleteInfoClickClose={onDeleteInfoClickClose} onDeleteInfoClick={onDeleteInfoClick} onDeleteSubmit={onDeleteSubmit} />}
                    </Card>




                )) : <h3 style={{ textAlign: "center" }}>No information from other passengers.</h3>}
            </div>

        </div>

    )
}