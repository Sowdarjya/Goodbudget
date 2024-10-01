import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/Modal/Modal";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { query } from "firebase/firestore";
import Transactions from "../components/Transactions/Transactions";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
      toast.error("SignUp first");
    }

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
      <Header isVisible={true} />
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
      <br />
      <Transactions />
      <Modal isVisible={isModalVisible} onClose={closeModal} type={modalType} />
    </div>
  );
};

export default Dashboard;
