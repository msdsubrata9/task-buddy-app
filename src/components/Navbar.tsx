import React from "react";
import useWindowSize from "../utils/useWindowSize";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  setBoardView: (isBoardView: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setBoardView }) => {
  const { user, logout } = useAuth();
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  return (
    <div className="bg-purple-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">TaskBuddy</h1>
        {user && (
          <div className="flex items-center">
            <span
              className="p-3 cursor-pointer text-white"
              onClick={() => setBoardView(false)}
            >
              List
            </span>
            {!isMobile && (
              <span
                className="p-3 cursor-pointer text-white"
                onClick={() => setBoardView(true)}
              >
                Board
              </span>
            )}
            <button
              onClick={logout}
              className="ml-4 p-2 bg-red-500 text-white rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
