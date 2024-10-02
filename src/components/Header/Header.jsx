import React from "react";
import { auth } from "../../config/firebaseConfig";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = ({ isVisible }) => {
  const navigate = useNavigate();

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

  return (
    <nav className="bg-[#212a31] flex p-3 items-center justify-between">
      <div>
        <p className="text-xl font-bold text-[#d3d9d4]">GoodBudget</p>
      </div>
      {isVisible ? (
        <button
          className="bg-[#d35e4f] p-2 rounded-md font-bold shadow-lg"
          onClick={logOut}
        >
          Log Out
        </button>
      ) : null}
    </nav>
  );
};

export default Header;
