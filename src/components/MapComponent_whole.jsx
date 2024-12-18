import React from 'react';
import { MapContainer,  ZoomControl, ScaleControl, Marker, Popup, Tooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';

const LocationMarker = () => {
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    const locateUser = () => {
        map.locate();
    };

    return (
        <div>
            <button onClick={locateUser}>Locate me</button>
        </div>
    );
};

import { ImageOverlay } from 'react-leaflet';

const NonTiledMapComponent = () => {
    const imageUrl = "http://127.0.0.1:8080/map";
    const imageBounds = [[-90, -180], [90, 180]]; // Adjust these bounds according to your image

    return (
        <MapContainer center={[0, 0]} zoom={13} style={{ height: "100vh", width: "100%" }} fullscreenControl={true}>
            <ImageOverlay url={imageUrl} bounds={imageBounds} />
            <ZoomControl position="bottomright" />
            <ScaleControl position="bottomleft" />
            <Marker position={[0, 0]}>
                <Popup>A sample popup</Popup>
                <Tooltip>A sample tooltip</Tooltip>
            </Marker>
            <LocationMarker />
        </MapContainer>
    );
};

export default NonTiledMapComponent;