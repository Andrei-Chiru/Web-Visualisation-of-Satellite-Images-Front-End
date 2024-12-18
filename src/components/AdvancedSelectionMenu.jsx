import React, { useState } from 'react';

const AdvancedSelectionMenu = ({ onClose }) => {
  const [selectedBands, setSelectedBands] = useState([]);
  const [indexThreshold, setIndexThreshold] = useState(50);

  const handleBandClick = (band) => {
    setSelectedBands((prevSelectedBands) =>
      prevSelectedBands.includes(band)
        ? prevSelectedBands.filter((b) => b !== band)
        : [...prevSelectedBands, band]
    );
  };

  const handleProceed = () => {
    // Add any additional logic here if needed
    onClose();
  };

  const handleThresholdChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setIndexThreshold(value);
    }
  };

  return (
    <div className="fixed inset-0  flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg w-96" id='advanced-selection-pop-up'>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg">Advanced selection</h2>
          <button className="text-white" id='close-pop-up' onClick={onClose}>
            &#10005;
          </button>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="text-white mb-2">Period</h3>
          <div className="flex justify-between">
            <div>
              <label className="text-white">From</label>
              <input type="date" className="bg-gray-700 text-white p-2 rounded" defaultValue="2023-05-10" />
            </div>
            <div>
              <label className="text-white">Until</label>
              <input type="date" className="bg-gray-700 text-white p-2 rounded" defaultValue="2024-05-10" />
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="text-white mb-2">Average index threshold</h3>
          <div className="flex justify-center items-center">
            <button
              className="text-white bg-gray-700 px-4 py-2 rounded-l-lg"
              onClick={() => setIndexThreshold(Math.max(0, indexThreshold - 1))}
            >
              &#60;
            </button>
            <input
              type="number"
              className="bg-gray-700 text-white text-center px-4 py-2"
              value={indexThreshold}
              onChange={handleThresholdChange}
              min="0"
              max="100"
            />
            <button
              className="text-white bg-gray-700 px-4 py-2 rounded-r-lg"
              onClick={() => setIndexThreshold(Math.min(100, indexThreshold + 1))}
            >
              &#62;
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="text-white mb-2">Bands</h3>
          <div className="grid grid-cols-4 gap-2">
            {['B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B8A', 'B09', 'B11', 'B12'].map((band) => (
              <button
                key={band}
                id={band}
                onClick={() => handleBandClick(band)}
                className={`p-2 rounded ${selectedBands.includes(band) ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}
              >
                {band} {selectedBands.includes(band) && <span>&#10003;</span>}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-gray-700 text-white px-4 py-2 rounded w-full" id='proceed-button' onClick={handleProceed}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default AdvancedSelectionMenu;
