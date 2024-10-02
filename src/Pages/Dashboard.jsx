import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/Modal/Modal";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import Transactions from "../components/Transactions/Transactions";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/");
      toast.error("Please sign in first");
      return;
    }

    const transactionsRef = collection(db, "users", user.uid, "transactions");
    const q = query(transactionsRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let incomeSum = 0;
        let expenseSum = 0;

        querySnapshot.forEach((doc) => {
          const transaction = doc.data();
          if (transaction.type === "income") {
            incomeSum += Number(transaction.amount) || 0;
          } else if (transaction.type === "expense") {
            expenseSum += Number(transaction.amount) || 0;
          }
        });

        setTotalIncome(incomeSum);
        setTotalExpense(expenseSum);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching totals:", error);
        toast.error("Failed to load transaction totals");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, navigate]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType("");
  };

  if (isLoading) {
    return (
      <div className="text-center text-[#d3d9d4] mt-4">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      <Header isVisible={true} />
      {user?.displayName && (
        <h1 className="font-semibold mt-3 mx-4 text-xl text-[#d3d9d4]">
          Welcome,{" "}
          <span className="text-[#f6b25a] uppercase">{user.displayName}</span>
        </h1>
      )}
      <div className="flex flex-col items-center justify-around md:flex-row">
        <Card
          showBtn={true}
          title="Total Income"
          amount={totalIncome}
          buttonText="Add Income"
          onClick={() => openModal("income")}
        />
        <Card
          title="Current Balance"
          amount={totalIncome - totalExpense}
          buttonText="Reset"
          onClick={() => openModal("reset")}
        />
        <Card
          showBtn={true}
          title="Total Expense"
          amount={totalExpense}
          buttonText="Add Expense"
          onClick={() => openModal("expense")}
        />
      </div>
      <Transactions />
      <Modal isVisible={isModalVisible} onClose={closeModal} type={modalType} />
    </div>
  );
};

export default Dashboard;
