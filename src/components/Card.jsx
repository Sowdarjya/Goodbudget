import React from "react";

const Card = ({ title, buttonText, onClick, amount, showBtn }) => {
  return (
    <div className="m-3 w-1/3">
      <div className="w-full bg-[#d3d9d4] p-4 rounded-lg shadow-xl shadow-[#212a31] h-[170px]">
        <h4 className="text-2xl mb-2">{title}</h4>
        <p className="text-3xl mb-2 font-bold">$ {amount}</p>
        {showBtn ? (
          <button
            className="bg-[#212a31] hover:bg-[#29343c] font-bold text-[#d3d9d4] p-2 rounded-md  transition-colors"
            onClick={onClick}
          >
            {buttonText}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
