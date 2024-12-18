import React from 'react';
import '../styles/Columns.css';

const Controls = () => {
  return (
    <div className="text-white" id='column-controls'>
      <div className="flex justify-center">
        <h2 className="text-lg mb-2 text-center" id='controls-title'>Controls</h2>
      </div>
      <div className="rowed">
        <div className="columned">
          <label className="item_in_column">Center Marker:</label>
          <label className="item_in_column">Show Region Borders:</label>
          <label className="item_in_column">Show Region Labels:</label>
          <label className="item_in_column">Crop Images to Borders:</label>
        </div>
        <div className="columned">
          <label className="switch item_in_column">
            <input type="checkbox" id="toggle-center-marker" name="toggle-center-marker"/>
            <span className="slider"></span>
          </label>
          <label className="switch item_in_column">
            <input type="checkbox" id="toggle-highlight-regions" name="toggle-highlight-regions"/>
            <span className="slider"></span>
          </label>
          <label className="switch item_in_column">
            <input type="checkbox" id="toggle-show-region-labels" name="toggle-show-region-labels"/>
            <span className="slider"></span>
          </label>
          <label className="switch item_in_column">
            <input type="checkbox" id="toggle-crop-images" name="toggle-crop-images"/>
            <span className="slider"></span>
          </label>
        </div>
        <div className="columned">
          <label className="item_in_column">Show Region Centers:</label>
          <label className="item_in_column">Show Map Information:</label>
          <label className="item_in_column">Show Satellite Image:</label>
        </div>
        <div className="columned">
          <label className="switch item_in_column">
            <input type="checkbox" id="toggle-show-region-centers" name="toggle-show-region-centers"/>
            <span className="slider"></span>
          </label>
          <label className="switch item_in_column">
            <input type="checkbox" id="toggle-show-map-information" name="toggle-show-map-information"/>
            <span className="slider"></span>
          </label>
          <label className="switch item_in_column">
            <input type="checkbox" id="toggle-show-satellite-image" name="toggle-satellite"/>
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Controls;
