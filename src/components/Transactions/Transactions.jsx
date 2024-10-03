import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { db } from "../../config/firebaseConfig";
import { getDocs, orderBy, query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { auth } from "../../config/firebaseConfig";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const user = auth.currentUser;
  const transactionsCollectionRef = collection(
    db,
    "users",
    user.uid,
    "transactions"
  );
  useEffect(() => {
    const getTransactions = async () => {
      try {
        const q = query(
          transactionsCollectionRef,
          orderBy("createdAt", "desc")
        );
        const data = await getDocs(q);
        setTransactions(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();
  }, [transactions]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }

    return timestamp;
  };

  return (
    <div className="p-2">
      <h2 className="p-2 bg-[#212a31] text-[#d3d9d4] font-semibold text-center rounded-lg text-2xl uppercase">
        History
      </h2>
      <div className="flex items-center justify-around bg-[#a9abaa] mt-2 p-2 rounded-lg shadow-2xl w-full">
        <p className="text-[#212a31] font-bold md:text-[1rem] text-xs uppercase w-1/4 text-center">
          Date & time
        </p>
        <p className="text-[#212a31] font-bold md:text-[1rem] text-xs uppercase w-1/4 text-center">
          Type
        </p>
        <p className="text-[#212a31] font-bold md:text-[1rem] text-xs uppercase w-1/4 text-center">
          Description
        </p>
        <p className="text-[#212a31] font-bold md:text-[1rem] text-xs uppercase w-1/4 text-center">
          Amount
        </p>
      </div>
      <ul className=" flex flex-col items-center">
        {transactions.map((transaction) => (
          <li className="flex items-center justify-around bg-[#d3d9d4] mt-2 p-3 rounded-lg shadow-2xl w-full">
            <p className="text-[#212a31] font-bold w-1/4 text-center md:text-[1rem] text-xs">
              {formatDate(transaction.createdAt)}
            </p>{" "}
            <p className="text-[#212a31] font-bold w-1/4 text-center md:text-[1rem] text-xs capitalize">
              {transaction.type}
            </p>
            <p className="text-[#212a31] font-bold w-1/4 text-center md:text-[1rem] text-xs">
              {transaction.title}
            </p>
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
    </div>
  );
};

export default Transactions;
