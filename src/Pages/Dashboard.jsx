import React from "react";
import Card from "../components/Card";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-around md:flex-row">
      <Card title={"Total income"} buttonText={"Add income"} />
      <Card title={"Current balance"} buttonText={"Reset"} />
      <Card title={"Total Expense"} buttonText={"Add expense"} />
    </div>
  );
};

export default Dashboard;
