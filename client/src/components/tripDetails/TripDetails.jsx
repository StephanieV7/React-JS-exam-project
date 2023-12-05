import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Alert, Button, Card } from "react-bootstrap";

import GoogleMapComponent from "./googleMaps/GoogleMaps";
import { LoadScript } from '@react-google-maps/api';

import styles from './TripDetails.module.css'
import * as sharedService from '../../services/sharedService';
import AddPassengerInfoModal from "./AddPassengerInfoModal";
import ShareTripModal from "./ShareTripModal";
import DeleteTripModal from "./DeleteTripModal";
import AuthContext from '../../contexts/AuthContext';
import { formatDate } from "../../utils/dateUtil";
import DeletePassengerInfoModal from "./DeletePassengerInfoModal";
import PassengerInfoContext from '../../contexts/PassengerInfoContext';
import EditPassengerInfoModal from "./EditPassengerInfoModal";


export default function TripDetails() {
    const [trip, setTrip] = useState({});
    const [loadedTripInfo, setLoadedTripInfo] = useState(false);

    const [error, setError] = useState(false)

    const [addedInfo, setAddedInfo] = useState(false)

    const [passengerInfo, setPassengerInfo] = useState([]);

    const [showDeletePassengerInfo, setShowDeletePassengerInfo] = useState(false)

    const [showPassengerInfo, setShowPassengerInfo] = useState(false);

    const [showShareTrip, setShowShareTrip] = useState(false);

    const [showDeleteTrip, setShowDeleteTrip] = useState(false);

    const [showEditPassengerInfo, setShowEditPassengerInfo] = useState(false);

    const { _id } = useParams();
    const { _id: userId } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripResult = await tripService.getOne(_id);
                setTrip(tripResult);
            } catch (error) {
                setError(error.message);
            }

            try {
                const passengerInfoResult = await sharedService.getAllPassengersInfo(_id);
                console.log(passengerInfoResult);
                setPassengerInfo(passengerInfoResult);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
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
        setShowPassengerInfo(true)
    }

    const onClickAddPassengerInfoClose = () => {
        setShowPassengerInfo(false)
    }

    const onClickSubmitPassengerInfo = (result) => {

        if (result) {
            setPassengerInfo((state) => [...state, result]);
            setAddedInfo(true);
            setShowPassengerInfo(false);
        } else {

            setError(result);
            setAddedInfo(true);
            setShowPassengerInfo(false);

        }
    }

    const onShareClickClose = () => {
        setShowShareTrip(false);
    }
    const onShareClick = () => {
        setShowShareTrip(true);
    }

    const onDeleteClickClose = () => {
        setShowDeleteTrip(false);
    }
    const onDeleteClick = () => {
        setShowDeleteTrip(true);
    }


    const onDeleteInfoClickClose = () => {
        setShowDeletePassengerInfo(false);
    }
    const onDeleteInfoClick = () => {
        setShowDeletePassengerInfo(true);

    }

    const onDeleteSubmit = (error) => {
        setAddedInfo(false);
        setError(error);

    }

    const onEditInfoClickClose = (error) => {
        setShowEditPassengerInfo(false);
        setError(error);
    }
    const onEditInfoClick = () => {
        setShowEditPassengerInfo(true);

    }

    console.log(trip);
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

                    {showPassengerInfo && <AddPassengerInfoModal show={showPassengerInfo} tripId={_id} onClickAddPassengerInfoClose={onClickAddPassengerInfoClose} onClickSubmitPassengerInfo={onClickSubmitPassengerInfo} />}
                    {!addedInfo && <Button variant="primary" onClick={onClickAddPassengerInfo}>Add your info to the trip</Button>}




                </div>


            }




            <h2 className={styles.headlines}>{trip.title}</h2>
            <div className={styles.mainDetailsContainer}>
                {trip.shared && <div>Shared to {trip.shared}</div>}

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
                        {d.accomodation !== undefined && d.accomodation !== "" && <Card.Body> Accomodation: {d.accomodation} </Card.Body>}
                        {d.currency !== undefined && d.currency !== "" && <Card.Body>Currency: {d.currency}</Card.Body>}
                        {d.additionalNotes !== undefined && d.additionalNotes !== "" && <Card.Body>Additional Notes: {d.additionalNotes}</Card.Body>}
                    </Card>

                ))}

            </div>

            {/* <div style={{
                width: '300px',
                minHeight: '300px',
                margin: "auto"
            }}> */}
            <div className={styles.mapContainer}>
                <GoogleMapComponent address={trip.destinations[0].accomodation} />
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
                        <Button variant="danger" onClick={onDeleteInfoClick} disabled={passengerInfo[0]._ownerId !== userId}> Delete info</Button>
                        {showDeletePassengerInfo && <DeletePassengerInfoModal showDeletePassengerInfo={showDeletePassengerInfo} passengerInfoId={passengerInfo[0]._id} onDeleteInfoClickClose={onDeleteInfoClickClose} onDeleteInfoClick={onDeleteInfoClick} onDeleteSubmit={onDeleteSubmit} />}

                        <Button variant="primary" onClick={onEditInfoClick} disabled={passengerInfo[0]._ownerId !== userId}> Edit/Update info</Button>

                        {showEditPassengerInfo && <EditPassengerInfoModal showEditPassengerInfo={showEditPassengerInfo} passengerInfoId={passengerInfo[0]._id} onEditInfoClickClose={onEditInfoClickClose} onEditInfoClick={onEditInfoClick} />}
                    </Card>




                )) : <h3 style={{ textAlign: "center" }}>No information from other passengers.</h3>}
            </div>

        </div>

    )
}