import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MapComponent = () => {
    const [isInverted, setIsInverted] = useState(false);

    useEffect(() => {

    }, []);

    const toggleInvert = () => {
        setIsInverted(!isInverted);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="mb-4">Satelite Image Visualizer</h1>
            <div className="card" style={{ width: '90%', height: '80%' }}>
                <div className="card-body">
                    <h5 className="card-title">Map</h5>
                    <button onClick={() => document.documentElement.requestFullscreen()}>Fullscreen</button>
                    <button>Algorithm 1</button>
                    <button>Algorithm 2</button>
                    <button>Algorithm 3</button>
                    <button onClick={toggleInvert}>Invert Colors</button>
                    <button>Search</button>
                    <iframe
                        src="http://localhost:8000/media/leaflet.html"
                        style={{ height: "100%", width: "100%", filter: isInverted ? 'invert(1)' : 'none' }}
                        title="SATELITE IMAGE"
                    />
                </div>
            </div>
        </div>
    );
};

export default MapComponent;