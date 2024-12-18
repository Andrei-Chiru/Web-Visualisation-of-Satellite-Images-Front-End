import React from 'react';
import { regions } from './Map.jsx';
const RegionSelector = ({ onRegionChange }) => {
  const handleRegionChange = (event) => {
    const regionName = event.target.value;
    const regionCoords = regions[regionName];
    onRegionChange(regionCoords);
  };

  return (
    <div className="text-white">
      <div className="flex justify-center">
        <h2 className="text-lg mb-2">Select a Region</h2>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg h-44">
        <select className="bg-white text-gray-800 p-2 rounded w-full" onChange={handleRegionChange}>
          <option value="">Select a Region</option>
          {Object.keys(regions).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RegionSelector;







