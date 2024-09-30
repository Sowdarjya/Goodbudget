import React, { useState } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/Modal/Modal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType("");
  };

  return (
    <div>
      <Header />
      <div className="px-4 pt-2 flex flex-col items-end">
        <button
          className="bg-[#d35e4f] p-2 rounded-md font-bold shadow-lg"
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
      <div className="flex flex-col items-center justify-around md:flex-row">
        <Card
          title="Total income"
          buttonText="Add income"
          onClick={() => openModal("income")}
        />
        <Card
          title="Current balance"
          buttonText="Reset"
          onClick={() => openModal("reset")}
        />
        <Card
          title="Total Expense"
          buttonText="Add expense"
          onClick={() => openModal("expense")}
        />
      </div>
      <Modal isVisible={isModalVisible} onClose={closeModal} type={modalType} />
    </div>
  );
};

export default Dashboard;
