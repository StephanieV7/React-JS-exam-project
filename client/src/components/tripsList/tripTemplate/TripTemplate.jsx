import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function TripTemplate({ _id, title, destinations }) {
    
    return (
        <div key={_id} className="p-2">
            <Card className="custom-card" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="/images/travel-photo.jpeg" />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        Destination: {destinations.map((object) => object.destination).join(', ')} <br />
                        Start date: {destinations[0].startDate} 
                    </Card.Text>

                    <Button as={Link} to={`/trips/${_id}`} variant="primary">Details</Button>
                </Card.Body>
            </Card>
        </div>
    )
}