import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/Modal/Modal";
import { getDocs, onSnapshot } from "firebase/firestore";
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
  const [transactions, setTransactions] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/");
      toast.error("SignUp first");
    }

    const transactionsRef = collection(db, "users", user.uid, "transactions");
    const q = query(transactionsRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let incomeSum = 0;
      let expenseSum = 0;

      querySnapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.type === "income") {
          incomeSum += transaction.amount;
        } else if (transaction.type === "expense") {
          expenseSum += transaction.amount;
        }
      });

      setTotalIncome(incomeSum);
      setTotalExpense(expenseSum);
    });

    return () => unsubscribe();
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
      {user.displayName ? (
        <h1 className="font-semibold mt-3 mx-4 text-xl text-[#d3d9d4]">
          {" "}
          Welcome,{" "}
          <span className="text-[#f6b25a] uppercase">
            {user.displayName}
          </span>{" "}
        </h1>
      ) : null}
      <div className="flex flex-col items-center justify-around md:flex-row">
        <Card
          showBtn={true}
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
          showBtn={true}
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
