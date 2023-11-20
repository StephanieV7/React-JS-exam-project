import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function TripTemplate({ _id, title, destination, startDate, endDate }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {destination}
                    From {startDate} to {endDate}
                </Card.Text>
                
                <Button as={Link} to={`/trips/${_id}`} variant="primary">Details</Button>
            </Card.Body>
        </Card>
    )
}



// <div className="trip-template">
// <h1>{title}</h1>
// <h3>Destination:</h3>
// <ul>
//     <h4>{destination}</h4>
// </ul>
// <h3>From {startDate} to {endDate}</h3>
// </div>