import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { onSnapshot, collection, query, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Transactions from "../components/Transactions/Transactions";

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigator("/");
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.Username || "User");
        }

        const transactionRef = collection(
          db,
          "users",
          user.uid,
          "transactions"
        );
        const q = query(transactionRef);
        unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          let income = 0;
          let expense = 0;

          querySnapshot.forEach((doc) => {
            const transaction = doc.data();
            if (transaction.type === "income") {
              income += transaction.amount;
            } else if (transaction.type === "expense") {
              expense += transaction.amount;
            }
          });

          setTotalIncome(income);
          setTotalExpense(expense);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error setting up dashboard:", error);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, [navigator]);

  const showModal = (type) => {
    setModalInfo(type);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setModalInfo("");
    setIsModalVisible(false);
  };

  if (loading || !auth.currentUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl text-[#d3d9d4]">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Header isVisible={true} />
      <h1 className="text-2xl px-4 font-medium text-[#d3d9d4]">
        Welcome, <span className="uppercase text-[#faa153]">{username}</span>{" "}
      </h1>
      <div className="flex flex-col md:flex-row px-4 items-center">
        <Card
          title={"Total income"}
          amount={totalIncome}
          showBtn={true}
          buttonText={"Add income"}
          onClick={() => showModal("income")}
        />
        <Card title={"Current balance"} amount={totalIncome - totalExpense} />
        <Card
          title={"Total expense"}
          amount={totalExpense}
          showBtn={true}
          buttonText={"Add expense"}
          onClick={() => showModal("expense")}
        />
      </div>
      <Transactions />
      <Modal isVisible={isModalVisible} onClose={closeModal} type={modalInfo} />
    </div>
  );
};

export default Dashboard;
