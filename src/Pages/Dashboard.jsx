import React from "react";
import Header from "../components/Header/Header";
import Card from "../components/Card";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigator = useNavigate();

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigator("/");
      })
      .catch((error) => {
        toast.error(error);
      });
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
        <Card title={"Total income"} buttonText={"Add income"} />
        <Card title={"Current balance"} buttonText={"Reset"} />
        <Card title={"Total Expense"} buttonText={"Add expense"} />
      </div>
    </div>
  );
};

export default Dashboard;
