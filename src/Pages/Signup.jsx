import React from "react";
import { useState } from "react";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [haveAnAccount, setHaveAnAccount] = useState(false);

  return (
    <div className="flex items-center justify-center h-[90vh]">
      {haveAnAccount ? (
        <div className="bg-[#12b3eb] w-[50%] rounded-lg p-6 h-[55%]">
          <h2 className="text-center text-3xl m-3">GoodBudget</h2>

          <form>
            <div className="mb-3">
              <p className="font-medium text-base">Email</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <p className="font-medium text-base">Password</p>
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button className="bg-slate-900 p-1 w-full  text-white rounded-md hover:bg-slate-800">
                LogIn
              </button>
            </div>
            <p className="text-center mt-2">
              Don't have an account ?
              <span
                onClick={() => setHaveAnAccount(!haveAnAccount)}
                className="underline hover:text-slate-900 hover:cursor-pointer"
              >
                Click Here
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className="bg-[#12b3eb] w-[50%] rounded-lg p-6 h-5/6">
          <h2 className="text-center text-3xl m-3">GoodBudget</h2>

          <form>
            <div className="mb-3">
              <p className="font-medium text-base">Username</p>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <p className="font-medium text-base">Email</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <p className="font-medium text-base">Password</p>
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <p className="font-medium text-base ">Confirm password</p>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-slate-900 p-1 w-1/2  text-white rounded-md hover:bg-slate-800">
                SignUp
              </button>
              <p className="font-medium text-lg m-3">or</p>
              <button className="bg-slate-900 p-1 w-1/2 text-white rounded-md hover:bg-slate-800">
                SignUp with Google
              </button>
            </div>
            <p className="text-center">
              Already have an account ?{" "}
              <span
                onClick={() => setHaveAnAccount(!haveAnAccount)}
                className="underline hover:text-slate-900 hover:cursor-pointer"
              >
                Click Here
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
