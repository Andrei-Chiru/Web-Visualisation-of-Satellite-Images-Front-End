import React from 'react';

const InfoPanel = ({ date, setDate, cloudCoverage, setCloudCoverage }) => {
    return (
        <div className="info-panel">
            <label>Date of the image:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <label>Cloud coverage:</label>
            <input type="range" min="0" max="100" value={cloudCoverage} onChange={(e) => setCloudCoverage(e.target.value)} />
            <span>{cloudCoverage}%</span>
        </div>
    );
};

export default InfoPanel;
