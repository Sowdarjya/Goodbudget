import React from "react";
import { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [haveAnAccount, setHaveAnAccount] = useState(false);

  const navigator = useNavigate();
  const provider = new GoogleAuthProvider();

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();
    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("User created");
            setConfirmPassword("");
            setEmail("");
            setPassword("");
            setUsername("");
            navigator("/dashboard");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      } else {
        toast.error("Password and confirm password do not match");
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  const signUpWithGoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        toast.success("user created");
        navigator("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const logIn = async (e) => {
    e.preventDefault();

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigator("/dashboard");
          setEmail("");
          setPassword("");
          toast.success("Successfully logged in");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory");
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      {haveAnAccount ? (
        <div className=" bg-[#d3d9d4] shadow-2xl shadow-[#212a31] w-[50%] rounded-lg p-6 h-[55%]">
          <h2 className="text-center font-bold text-3xl m-3 text-[#212a31]">
            GoodBudget
          </h2>

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
              <button
                className="bg-slate-900 p-1 w-1/2  text-white rounded-md hover:bg-slate-800"
                onClick={logIn}
              >
                LogIn
              </button>
              <p className="font-medium text-lg m-3">or</p>
              <button
                onClick={signUpWithGoogle}
                className="bg-slate-900 p-1 w-1/2 text-white rounded-md hover:bg-slate-800"
              >
                LogIn with Google
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
        <div className=" bg-[#d3d9d4] shadow-2xl shadow-[#212a31] w-[50%] rounded-lg p-6 h-5/6">
          <h2 className="text-center font-bold text-3xl m-3 text-[#212a31]">
            GoodBudget
          </h2>

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
              <button
                onClick={signUpWithEmailAndPassword}
                className="bg-slate-900 p-1 w-1/2  text-white rounded-md hover:bg-slate-800"
              >
                SignUp
              </button>
              <p className="font-medium text-lg m-3">or</p>
              <button
                onClick={signUpWithGoogle}
                className="bg-slate-900 p-1 w-1/2 text-white rounded-md hover:bg-slate-800"
              >
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
