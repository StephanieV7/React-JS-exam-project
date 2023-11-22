import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const GoogleMapComponent = () => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCKj6A1eMblGKGy3IsV2ZbElFfNTZZJePA" // Replace with your API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Your map components go here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;