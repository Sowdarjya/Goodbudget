import React from "react";

const Transactions = () => {
  return (
    <div className="p-2">
      <h2 className="bg-[#212a31] text-[#d3d9d4] p-2 rounded-lg text-center font-semibold text-2xl">
        History
      </h2>
      <ul>
        <li className="flex items-center justify-around bg-[#d3d9d4] mt-2 p-2 rounded-lg shadow-2xl">
          <p className="text-[#212a31] font-semibold">Date</p>
          <p className="text-[#212a31] font-semibold">Description</p>
          <p className="text-[#212a31] font-semibold">Amount</p>
          <p className="text-[#212a31] font-semibold">Delete</p>
        </li>
      </ul>
    </div>
  );
};

export default Transactions;
