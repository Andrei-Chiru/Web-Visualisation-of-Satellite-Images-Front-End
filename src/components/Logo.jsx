import React from "react";

const Logo = () => {
    return (
        <svg width="25" height="9" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.80499 2V16.5" stroke="url(#paint0_linear_11_21)" stroke-width="4" stroke-linecap="round"/>
            <path d="M12.805 3.8501V14.6501" stroke="url(#paint1_linear_11_21)" stroke-width="4" stroke-linecap="round"/>
            <path d="M22.805 5.7002V12.8002" stroke="url(#paint2_linear_11_21)" stroke-width="4" stroke-linecap="round"/>
            <defs>
                <linearGradient id="paint0_linear_11_21" x1="0" y1="0" x2="25" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EC008C"/>
                    <stop offset="1" stop-color="#FC6767"/>
                </linearGradient>
                <linearGradient id="paint1_linear_11_21" x1="0" y1="0" x2="25" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#E65C00"/>
                    <stop offset="1" stop-color="#F9D423"/>
                </linearGradient>
                <linearGradient id="paint2_linear_11_21" x1="0" y1="0" x2="25" y2="19" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00D2FF"/>
                    <stop offset="1" stop-color="#3A7BD5"/>
                </linearGradient>
            </defs>
        </svg>
    )
}

export default Logo;