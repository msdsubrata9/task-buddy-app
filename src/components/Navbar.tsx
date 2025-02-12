import React from "react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  setBoardView: (isBoardView: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setBoardView }) => {
  const { user, logout } = useAuth();

  return (
    <div>
      <div>
        {user && (
          <div className="flex justify-between m-7">
            <div>
              <h1 className="text-2xl font-bold text-purple-500">TaskBuddy</h1>
              <span>
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => setBoardView(false)}
                >
                  List
                </span>
                <span
                  className="p-3 cursor-pointer"
                  onClick={() => setBoardView(true)}
                >
                  Board
                </span>
              </span>
            </div>
            <div>
              <p>{user.displayName}</p>
              <button
                onClick={logout}
                className="mt-2 px-4 py-2 border-2 rounded-full"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
