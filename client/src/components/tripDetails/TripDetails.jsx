import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Button, Alert, Card } from "react-bootstrap";
//import GoogleMapComponent from "./addMoreDetails/GoogleMaps";
import styles from './TripDetails.module.css'
import * as sharedService from '../../services/sharedService';



export default function TripDetails() {
    const [trip, setTrip] = useState({});
    const [loadedResponse, setLoadedResponse] = useState(false);

    const { _id } = useParams();

    useEffect(() => {
        const fetchById = async () => {

            const result = await tripService.getOne(_id);
            setTrip(result);
            setLoadedResponse(true);

        };

        fetchById();
    }, [_id]);

    //???при shared trips и trips list не е необходимо да правя отделна функция в useEffect и ми зарежда правилно, а тук ако не я сложа се опитва да извлича данни от празен обект и ми дава грешка, т.е. кодът надолу се изпълнява преди да се е върнал резултатът от заявката

    const shareHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = { shared: formData.get('email') };


        const result = await tripService.edit(_id, data);
        return true
        //to-do: add error handling
        //to-do: add form validation
        //to-do: hide the alert info message after 5 seconds
    }

    if (!loadedResponse) {
        return <p>Loading...</p>;
        //add spinner
    }



    return (
        <div>
            <h1>{trip.title}</h1>

            <div className={styles.buttonContainer}>
                <Button className={styles.addTripButton} variant="outline-info">Edit/ Update</Button> {' '}
                {/* <Button className={styles.addTripButton} variant="outline-info" onClick={onShareClick}>Share</Button>{' '} */}
                <form onSubmit={shareHandler}>
                    <div>
                        <label htmlFor="email">Share this trip to:</label>{' '}
                        <input type="email" name="email" id="email" placeholder="enter email address" />
                    </div>
                    <p>Note: you can share your trips only to other registered users</p>
                    <div>
                        <input type="submit" value="Send" />
                    </div>
                    {shareHandler && <Alert transition={true} variant="info">"You've successfuly shared your trip."</Alert>}
                </form>

            </div>
            {/* <div>
                <h1>My React Google Maps App</h1>
                <GoogleMapComponent />
            </div> */}
            <div>
                {/* <h1>Destination: {trip.destination}</h1>
                <p>Start date: {trip.startDate}</p>
                <p>End date: {trip.endDate}</p> */}
                <h1>Destination: {trip.destinations[0].destination}</h1>
                <p>Start date: {trip.destinations[0].startDate}</p>
                <p>End date: {trip.destinations[0].endDate}</p>
            </div>
            <div>
                <p>Accomodation:</p>
            </div>

            <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>

    )
}