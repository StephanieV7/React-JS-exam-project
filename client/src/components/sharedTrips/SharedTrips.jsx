import * as sharedService from '../../services/sharedService'
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';

export default function SharedTrips () {
    const [sharedTrips, setSharedTrips] = useState([]);
    
   const { email } = useContext(AuthContext)

    useEffect(() => {
        sharedService.getSharedTrips(email)
            .then(result => setSharedTrips(result))
    }, [])

 console.log(sharedTrips);

    return (
        <>

          
              <p>some data</p>
                 {/* {sharedTrips.length > 0 
                ?    <Stack gap={3}>
                        {
                            sharedTrips.map(trip => <p>{...trip}</p>)
                        }

                    </Stack>
                : <p>No shared trips.</p> */}


        </>

    )
}