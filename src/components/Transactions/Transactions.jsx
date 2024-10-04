import React, { useEffect, useState } from "react";
import { db, auth } from "../../config/firebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const transactionRef = collection(db, "users", user.uid, "transactions");
      const q = query(transactionRef, orderBy("createdAt", "desc"));

      const unsubscribeSnapshot = onSnapshot(
        q,
        (querySnapshot) => {
          let transactionsArray = [];
          querySnapshot.forEach((doc) => {
            transactionsArray.push({ ...doc.data(), id: doc.id });
          });
          setTransactions(transactionsArray);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching transactions:", error);
          toast.error("Error fetching transactions");
          setIsLoading(false);
        }
      );

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }

    return timestamp;
  };

  if (isLoading) {
    return null;
  }

  if (!auth.currentUser) {
    return null;
  }

  return (
    <div className="flex justify-center mt-4 flex-col items-center">
      <h1 className="text-2xl bg-[#212a31] text-[#d3d9d4] w-[90%] md:w-[80%] text-center font-semibold uppercase rounded-2xl p-3 mb-4">
        History
      </h1>
      <div className="flex justify-around items-center bg-[#66696a] w-[90%] md:w-[70%] mb-3 p-3 rounded-lg">
        <p className="font-bold md:text-[1rem] text-[0.8rem] text-[#d3d9d4] uppercase text-center w-1/4">
          Date & Time
        </p>
        <p className="font-bold md:text-[1rem] text-[0.8rem] text-[#d3d9d4] uppercase text-center w-1/4">
          Type
        </p>
        <p className="font-bold md:text-[1rem] text-[0.8rem] text-[#d3d9d4] uppercase text-center w-1/4">
          Description
        </p>
        <p className="font-bold md:text-[1rem] text-[0.8rem] text-[#d3d9d4] uppercase text-center w-1/4">
          Amount
        </p>
      </div>
      {transactions.length === 0 ? (
        <p className="text-[#d3d9d4]">No transactions found.</p>
      ) : (
        <ul className="flex flex-col gap-4 w-[90%] md:w-[70%]">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-around w-full items-center bg-[#d3d9d4] p-3 rounded-lg shadow-2xl"
            >
              <p className="w-1/4 font-semibold text-center capitalize md:text-[1rem] text-[0.6rem]">
                {formatDate(transaction.createdAt)}
              </p>
              <p className="w-1/4 font-semibold text-center capitalize md:text-[1rem] text-[0.6rem]">
                {transaction.type}
              </p>
              <p className="w-1/4 font-semibold text-center capitalize md:text-[1rem] text-[0.6rem]">
                {transaction.title}
              </p>
              {transaction.type === "expense" ? (
                <p className="text-[#bd3c3c] font-bold w-1/4 text-center md:text-[1rem] text-[0.6rem]">
                  -${transaction.amount}
                </p>
              ) : (
                <p className="text-[#41c932] font-bold w-1/4 text-center md:text-[1rem] text-[0.6rem]">
                  +${transaction.amount}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
