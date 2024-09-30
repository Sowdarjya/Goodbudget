import React from "react";

const Card = ({ title, buttonText, onClick }) => {
  return (
    <div className="m-3 w-1/3">
      <div className="w-full bg-[#d3d9d4] p-4 rounded-lg shadow-xl shadow-[#212a31]">
        <h4 className="text-2xl font-semibold mb-2">{title}</h4>
        <p className="text-2xl mb-2">$0</p>
        <button
          className="bg-[#212a31] font-bold text-[#d3d9d4] p-2 rounded-md hover:bg-[#2c3e50] transition-colors"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
