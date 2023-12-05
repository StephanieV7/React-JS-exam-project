import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const GoogleMapComponent = ({ address }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setCenter({ lat: lat(), lng: lng() });
      } else {
        console.error('Invalid address:', address);
      }
    });
  }, [address]);

  return (
    
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '200px',
        }}
        center={center}
        zoom={15}
      >
        {center.lat !== 0 && (
          <Marker position={{ lat: center.lat, lng: center.lng }} />
        )}
      </GoogleMap>
   
  );
};

export default GoogleMapComponent;