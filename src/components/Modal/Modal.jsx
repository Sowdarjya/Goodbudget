import React, { useState } from "react";
import { auth, db } from "../../config/firebaseConfig";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { toast } from "react-toastify";

const Modal = ({ isVisible, onClose, type }) => {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  const addTransaction = async (e) => {
    e.preventDefault();
    try {
      if (amount && title) {
        const user = auth.currentUser;
        await addDoc(collection(db, "users", user.uid, "transactions"), {
          title,
          amount: Number(amount),
          type,
          createdAt: serverTimestamp(),
        });

        toast.success("Transaction added successfully");
        setTitle("");
        setAmount("");
        onClose();
      } else {
        toast.error("All fields are mandatory");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const resetAmount = () => {
  //   set;
  // };

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent outline-none border-b-2 border-[#212a31] w-3/4 mb-4"
            />
            <p className="text-xl font-semibold">Amount: </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent outline-none border-b-2 border-[#212a31] w-3/4 mb-4"
            />
            <br />
            <button
              type="submit"
              className="bg-[#212a31] text-[#d3d9d4] p-2 rounded-lg hover:bg-[#29343c]"
              onClick={addTransaction}
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
            <button
              className="bg-[#212a31] hover:bg-[#29343c] p-2 text-[#d3d9d4] rounded-lg w-[45%]"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
