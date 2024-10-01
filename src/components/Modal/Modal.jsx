import React from "react";

const Modal = ({ isVisible, onClose, type }) => {
  if (!isVisible) return null;

  if (type === "income" || type === "expense") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[500px] flex flex-col bg-[#d3d9d4] h-[270px] p-4 rounded-md">
          <button className="text-[#212a31] place-self-end" onClick={onClose}>
            X
          </button>
          <form className="bg-[#d3d9d4] p-3">
            <p className="text-xl font-semibold">Title: </p>
            <input
              type="text"
              className="bg-transparent outline-none underline border-b-2 border-[#212a31] w-3/4 mb-4"
            />
            <p className="text-xl font-semibold">Amount: </p>
            <input
              type="number"
              className="bg-transparent outline-none underline border-b-2 border-[#212a31] w-3/4 mb-4"
            />
            <br />
            <button
              type="submit"
              className="bg-[#212a31] text-[#d3d9d4] p-2 rounded-lg hover:bg-[#29343c]"
            >
              Add {type}
            </button>
          </form>
        </div>
      </div>
    );
  } else if (type === "reset") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[450px] flex flex-col bg-[#d3d9d4] h-[150px] p-4 rounded-md">
          <button className="text-[#212a31] place-self-end" onClick={onClose}>
            X
          </button>
          <div className="mx-auto">
            <p className="text-3xl font-semibold mb-4 text-center">
              Are you sure about that ?
            </p>
            <button className="bg-[#212a31] hover:bg-[#29343c] p-2 text-[#d3d9d4] rounded-lg w-[45%] mr-1">
              Yes
            </button>
            <button className="bg-[#212a31] hover:bg-[#29343c] p-2 text-[#d3d9d4] rounded-lg w-[45%]">
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="modal">
  //     <div className="modal-content">
  //       <h2>{title}</h2>
  //       {content}
  //       <button onClick={onClose}>Close</button>
  //     </div>
  //   </div>
  // );
};

export default Modal;
