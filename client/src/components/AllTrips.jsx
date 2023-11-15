import TripTemplate from "./TripTemplate"

export default function AllTrips(props) {
    return (
        <div className="all-trips">
            <ul>
                <TripTemplate data={props}/>
            </ul>
        </div>
    )
}