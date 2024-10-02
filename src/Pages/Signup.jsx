import React from "react";
import { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { db } from "../config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [haveAnAccount, setHaveAnAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();
  const provider = new GoogleAuthProvider();

  const signUpWithEmailAndPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("Authenticated");
            setLoading(false);
            addToDb(user);
            setConfirmPassword("");
            setEmail("");
            setPassword("");
            setUsername("");
            navigator("/dashboard");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and confirm password do not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const signUpWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        addToDb(user);
        setLoading(false);
        toast.success("Authenticated");
        navigator("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  };

  const logIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoading(false);
          setEmail("");
          setPassword("");
          toast.success("Successfully logged in");
          navigator("/dashboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const addToDb = async (user) => {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    try {
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          Username: user.displayName ? user.displayName : username,
          Email: user.email,
          CreatedAt: new Date(),
        });
        toast.success("User profile created successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-[90vh]">
        {haveAnAccount ? (
          <div className=" bg-[#d3d9d4] shadow-2xl shadow-[#212a31] md:w-[50%] w-[70%] rounded-lg p-6 h-[65%]">
            <h2 className="text-center font-bold md:text-3xl text-xl m-3 text-[#212a31]">
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
                  placeholder="Enter password"
                  value={password}
                  className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between md:flex-row flex-col">
                <button
                  className="bg-slate-900 p-1 md:w-1/2 w-full  text-white rounded-md hover:bg-slate-800"
                  onClick={logIn}
                >
                  {loading ? "Loading" : "LogIn"}
                </button>
                <p className="font-medium text-lg md:m-3 m-0">or</p>
                <button
                  onClick={signUpWithGoogle}
                  className="bg-slate-900 p-1 md:w-1/2 w-full text-white rounded-md hover:bg-slate-800"
                >
                  {loading ? "Loading" : "LogIn with Google"}
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
          <div className=" bg-[#d3d9d4] shadow-2xl shadow-[#212a31] md:w-[50%] w-[70%] rounded-lg p-6 h-5/6">
            <h2 className="text-center font-bold md:text-3xl text-xl m-3 text-[#212a31]">
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
                  placeholder="Enter password"
                  value={password}
                  className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p className="font-medium text-base ">Confirm password</p>
                <input
                  type="password"
                  placeholder="Enter password again"
                  value={confirmPassword}
                  className="bg-transparent outline-none placeholder:text-slate-600 w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between md:flex-row flex-col">
                <button
                  onClick={signUpWithEmailAndPassword}
                  className="bg-slate-900 p-1 md:w-1/2 w-full   text-white rounded-md hover:bg-slate-800"
                >
                  {loading ? "Loading" : "Signup"}
                </button>
                <p className="font-medium text-lg md:m-3 m-0">or</p>
                <button
                  onClick={signUpWithGoogle}
                  className="bg-slate-900 p-1 md:w-1/2 w-full  text-white rounded-md hover:bg-slate-800"
                >
                  {loading ? "Loading" : "SignUp with Google"}
                </button>
              </div>
              <p className="text-center">
                Already have an account ?
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
    </div>
  );
};

export default Signup;
