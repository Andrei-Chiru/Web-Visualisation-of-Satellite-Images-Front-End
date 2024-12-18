import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Map from '../components/Map.jsx';
import AlgorithmSelector from '../components/AlgorithmSelector.jsx';
import Information from '../components/Information.jsx';
import RegionSelector from '../components/RegionSelector.jsx';
import AdvancedSelectionPopup from '../components/AdvancedSelectionMenu.jsx';
import '../styles/MapPage.css'; // Import the CSS file
import Controls from '../components/Controls.jsx';

const MapPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // When the algorithm gets changed, get the new ID from the AlgorithmSelector Component
  const handleAlgorithmChange = (algorithmId) => {
    if (mapRef.current) {
      // Set the new id in the map reference
      mapRef.current.setAlgorithm(algorithmId);
      // And update the overview
      mapRef.current.updateView();
    }
  };

  const handleRegionChange = (regionCoords) => {
    if (mapRef.current) {
      mapRef.current.setView(regionCoords, 10); // Set zoom level to 10
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="map-page-container">
      <Header />
      <button className="home-button" id="home-button"onClick={handleHomeClick}>Home</button>
      <div className="map-container">
        <Map ref={mapRef} className="map-component" />
      </div>
      <div className="controls-container" >
        <div id='algorithmControlItem' className="control-item">
          <AlgorithmSelector onAlgorithmChange={handleAlgorithmChange}/>
        </div>
        <div id='informationControlItem' className="control-item">
          <Information onOpenPopup={handleOpenPopup} />
        </div>
        <div id='controlsControlItem' className="control-item">
          <Controls/>
        </div>
        <div id='regionControlItem' className="control-item">
          <RegionSelector onRegionChange={handleRegionChange} />
        </div>
      </div>
      {isPopupOpen && <AdvancedSelectionPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default MapPage;
