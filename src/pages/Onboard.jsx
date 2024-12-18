import React from 'react';
import RoundButton from "../components/RoundButton.jsx";
import backgroundImage from '/src/assets/onboard.png';
import { useNavigate } from "react-router-dom";

const Onboard = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/map');
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" id="background-image"
             style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-16 p-16" id='title-container'>
                <div className="mb-8 text-white text-5xl font-mono" id="center-title">Visualise Satellite Images.</div>
                <RoundButton
                    id='get-started-button'
                    color='white'
                    hoverColor='gray-200'
                    textColor='black'
                    text='Get started!'
                    onClick={handleGetStartedClick} />
            </div>
        </div>
    )
}

export default Onboard;
