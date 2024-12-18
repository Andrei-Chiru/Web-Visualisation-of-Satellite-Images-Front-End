import React, { useState } from 'react';
import '../styles/Columns.css'

const Information = ({ onOpenPopup }) => {

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibilityOfInfo = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="text-white">
      <div className="flex justify-center" id='column-containing-tab'>
        <h2 className="text-lg mb-2 text-center" id='information-text'>Information</h2>
      </div>
      <div className='rowed'>
        <div className="columned">
          <div>
            <div className="mb-2 flex items-center justify-center" id='image-date'>
              <label className="mr-2">Date of the Image: 08.04.2024</label>
            </div>
            <div className="mb-2 flex items-center justify-center" id='cloud-coverage'>
              <label className="mr-2">Cloud Coverage: 0%</label>
            </div>
          </div>
          <div className="flex justify-center space-x-2" id='button-div'>
            <button className="button" id='advanced_selection_button' onClick={onOpenPopup}>
              Advanced Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;












