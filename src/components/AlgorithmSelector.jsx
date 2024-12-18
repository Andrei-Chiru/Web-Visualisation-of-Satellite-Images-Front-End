import React from 'react';
import { algorithms } from './Map.jsx';

const AlgorithmSelector = ({onAlgorithmChange}) => {
  // When the algorithm gets changes, the new ID gets returned to the MapPage
  const handleAlgorithmChange = (event) => {
    const algorithmId = algorithms[event.target.value];
    onAlgorithmChange(algorithmId);
  };

  return (
    <div id='algorithmSelector' className="text-white">
      <div id='titleContainer' className="flex justify-center">
        <h2 id='title' className="text-lg mb-2">Select an Algorithm</h2>
      </div>
      <div id='selectContainer' className="bg-gray-700 p-4 rounded-lg h-44">
        <select id='select' className="bg-white text-gray-800 p-2 rounded w-full" onChange={handleAlgorithmChange}>
          {Object.keys(algorithms).map((algorithm) => (
            <option key={algorithm} value={algorithm}>
              {algorithm}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
