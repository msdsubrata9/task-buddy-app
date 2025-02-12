import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

const Login: React.FC = () => {
  const { user, login } = useAuth();

  // Dummy setBoardView function
  const setBoardView = (isBoardView: boolean) => {
    console.log("setBoardView called with:", isBoardView);
  };

  return (
    <div className="flex items-center h-screen pl-5">
      <div>
        <h1 className="text-2xl font-bold text-purple-500">TaskBuddy</h1>
        <h5>
          Streamline your workflow and track progress effortlessly with our
          all-in-one task management app.
        </h5>
        {user ? (
          <Navbar setBoardView={setBoardView} />
        ) : (
          <button
            className="mt-2 px-8 py-4 bg-black text-white rounded-full"
            onClick={login}
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
