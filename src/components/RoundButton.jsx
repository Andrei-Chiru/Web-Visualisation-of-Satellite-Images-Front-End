import React from "react";

const RoundButton = ({ id, color, hoverColor, textColor, text, onClick }) => {
  const button_id = id;
  const bgColor = `bg-${color}`;
  const hoverBgColor = `hover:bg-${hoverColor}`;
  const txtColor = `text-${textColor}`;

  return (
    <button
      id={button_id}
      onClick={onClick}
      className={`${bgColor} ${hoverBgColor} ${txtColor} font-bold py-2 px-4 rounded-full transition duration-300`}
    >
      {text}
    </button>
  );
};

export default RoundButton;
