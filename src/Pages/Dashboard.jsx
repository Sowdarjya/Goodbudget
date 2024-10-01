import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/Modal/Modal";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { query } from "firebase/firestore";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const transactionsRef = collection(db, "users", user.uid, "transactions");
    const q = query(transactionsRef);

    const unsubscribe = () => {
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const transaction = doc.data();
          if (transaction.type === "income") {
            setTotalIncome(totalIncome + transaction.amount);
          } else if (transaction.type === "expense") {
            setTotalExpense(totalExpense + transaction.amount);
          }
        });
      });
    };

    return unsubscribe();
  }, []);

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
          amount={totalIncome}
          buttonText="Add income"
          onClick={() => openModal("income")}
        />
        <Card
          title="Current balance"
          amount={totalIncome - totalExpense}
          buttonText="Reset"
          onClick={() => openModal("reset")}
        />
        <Card
          title="Total Expense"
          amount={totalExpense}
          buttonText="Add expense"
          onClick={() => openModal("expense")}
        />
      </div>
      <Modal isVisible={isModalVisible} onClose={closeModal} type={modalType} />
    </div>
  );
};

export default Dashboard;
