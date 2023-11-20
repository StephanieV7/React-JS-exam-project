import AddTripModal from "./AddTripModal"
import TripTemplate from "./TripTemplate"
import MediumExample from "./mediumExample"

export default function AllTrips(props) {
    return (
        <div className="all-trips">
            <ul>
                <TripTemplate data={props}/>
            </ul>

           
           <AddTripModal/>
        </div>
    )
}