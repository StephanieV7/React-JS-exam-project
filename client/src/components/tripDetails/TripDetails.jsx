import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Button, Card, Alert } from "react-bootstrap";

import AuthContext from '../../contexts/AuthContext';
import * as passengerInfoService from '../../services/passengerInfoService';
import styles from './TripDetails.module.css'

import AddPassengerInfoModal from "./AddPassengerInfoModal";
import ShareTripModal from "./ShareTripModal";
import DeleteTripModal from "./DeleteTripModal";
import GoogleMapComponent from "../googleMaps/GoogleMaps";
import { formatDate } from "../../utils/dateUtil";
import DeletePassengerInfoModal from "./DeletePassengerInfoModal";
import EditPassengerInfoModal from "./EditPassengerInfoModal";

export default function TripDetails() {
    const [trip, setTrip] = useState({});
    const [loadedTripInfo, setLoadedTripInfo] = useState(false);
    const [error, setError] = useState(false);
    const [isAddedInfo, setIsAddedInfo] = useState(false);
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
                setError(error);
            }

            try {
                const passengerInfoResult = await passengerInfoService.getAllPassengersInfo(_id);
                setIsAddedInfo(passengerInfoResult.length > 0);
                setPassengerInfo(passengerInfoResult);
            } catch (error) {
                if (error.code !== 404) {
                    setError(error)
                }
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
        setShowPassengerInfo(true);
    }

    const onClickAddPassengerInfoClose = () => {
        setShowPassengerInfo(false);
    }

    const onClickSubmitPassengerInfo = (result) => {

        if (result) {
            setPassengerInfo((state) => [...state, result]);
            setIsAddedInfo(true);
            setShowPassengerInfo(false);
        } else {
            setError(result);
            setShowPassengerInfo(false);

        }
    }

    const onShareClickClose = async () => {
        const tripResult = await tripService.getOne(_id);
        setTrip(tripResult);
        setShowShareTrip(false);
    };

    const onShareClick = () => {
        setShowShareTrip(true);
    };

    const onDeleteClickClose = () => {
        setShowDeleteTrip(false);
    };

    const onDeleteClick = () => {
        setShowDeleteTrip(true);
    };

    const onDeleteInfoClickClose = () => {
        setShowDeletePassengerInfo(false);
    };

    const onDeleteInfoClick = () => {
        setShowDeletePassengerInfo(true);
    };

    const onDeleteSubmit = (error) => {
        setIsAddedInfo(false);
        setError(error);
    }

    const onEditInfoClickClose = async () => {
        setShowEditPassengerInfo(false);
    };

    const onEditInfoClick = () => {
        setShowEditPassengerInfo(true);

    }
    const onEditInfoClickSubmit = (response) => {
        setPassengerInfo([response]);
    }

    return (
        <div className={styles.details}>
            {error && <Alert variant="danger">{error}</Alert>}
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
                    {!isAddedInfo && <Button variant="primary" onClick={onClickAddPassengerInfo}>Add your info to the trip</Button>}
                </div>
            }

            <h2 className={styles.headlines}>{trip.title}</h2>
            <div className={styles.mainDetailsContainer}>

                {trip.shared && <div>Shared to {trip.shared}</div>}
                {trip.destinations.map((d, i) => (
                    <div key={i}>
                        <Card  >
                            {d.destination !== undefined && d.destination !== '' && <Card.Body>
                                <span>Destination:</span>
                                <span className={styles.spanValues}> {d.destination}</span>
                            </Card.Body>}
                            {d.startDate !== undefined && d.startDate !== '' && <Card.Body>Start date: {formatDate(d.startDate)}</Card.Body>}
                            {d.arrivalTime !== undefined && d.arrivalTime !== "" && <Card.Body>Arrival time: {d.arrivalTime}</Card.Body>}
                            {d.endDate !== undefined && d.endDate !== '' && <Card.Body>End date: {formatDate(d.endDate)}</Card.Body>}
                            {d.departureTime !== undefined && d.departureTime !== "" && <Card.Body>Departure time: {d.departureTime}</Card.Body>}
                            {d.accomodation !== undefined && d.accomodation !== "" && <Card.Body> Accomodation: {d.accomodation} </Card.Body>}
                            {d.currency !== undefined && d.currency !== "" && <Card.Body>Currency: {d.currency}</Card.Body>}
                            {d.additionalNotes !== undefined && d.additionalNotes !== "" && <Card.Body>Additional Notes: {d.additionalNotes}</Card.Body>}
                        </Card>
                        {d.destination !== "" && d.accomodation && <div className={styles.mapContainer}>
                            <h5 styles={styles.headlines}>CHECK ON THE MAP</h5>
                            <GoogleMapComponent address={d.accomodation} />
                        </div>}
                    </div>
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
                        <Button variant="danger" onClick={onDeleteInfoClick} disabled={passengerInfo[0]._ownerId !== userId}> Delete info</Button>
                        {showDeletePassengerInfo && <DeletePassengerInfoModal showDeletePassengerInfo={showDeletePassengerInfo} passengerInfoId={passengerInfo[0]._id} onDeleteInfoClickClose={onDeleteInfoClickClose} onDeleteInfoClick={onDeleteInfoClick} onDeleteSubmit={onDeleteSubmit} />}

                        <Button variant="primary" onClick={onEditInfoClick} disabled={passengerInfo[0]._ownerId !== userId}> Edit/Update info</Button>

                        {showEditPassengerInfo && <EditPassengerInfoModal showEditPassengerInfo={showEditPassengerInfo} passengerInfoId={passengerInfo[0]._id} onEditInfoClickClose={onEditInfoClickClose} onEditInfoClick={onEditInfoClick} onEditInfoClickSubmit={onEditInfoClickSubmit} />}
                    </Card>

                )) : <h3 style={{ textAlign: "center" }}>No information from other passengers.</h3>}
            </div>
        </div>
    )
}