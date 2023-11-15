export default function TripTemplate(props) {
    return (
        <div className="trip-template">
        <h1>{props.data.title}</h1>
        <h3>Destinations:</h3>
        <ul>
            <h4>{props.data.destination1}</h4>
            <h4>{props.data.destination2}</h4>
        </ul>
        <h3>Duration: {props.data.duration} days</h3>
        <h3>From {props.data.startDate} to {props.data.endDate}</h3>
    </div>
    )
}