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
      <h1 className="text-2xl font-medium bg-[#212a31] text-[#d3d9d4] w-[90%] text-center font-semibold uppercase rounded-2xl p-3 mb-4">
        History
      </h1>
      {transactions.length === 0 ? (
        <p className="text-[#d3d9d4]">No transactions found.</p>
      ) : (
        <ul className="flex flex-col gap-4 w-[90%] md:w-[70%]">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-around w-full items-center bg-[#d3d9d4] p-3 rounded-lg"
            >
              <p>{formatDate(transaction.createdAt)}</p>
              <p>{transaction.type}</p>
              <p>{transaction.title}</p>
              {transaction.type === "expense" ? (
                <p className="text-[#bd3c3c] font-bold w-1/4 text-center md:text-[1rem] text-xs">
                  -${transaction.amount}
                </p>
              ) : (
                <p className="text-[#41c932] font-bold w-1/4 text-center md:text-[1rem] text-xs">
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
