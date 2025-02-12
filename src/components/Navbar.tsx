import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <div>
        {user && (
          <div className="flex justify-between m-7">
            <div>
              <h1 className="text-2xl font-bold text-purple-500">TaskBuddy</h1>
              <span>
                <span className="p-3 cursor-pointer">List</span>
                <span className="p-3 cursor-pointer">Board</span>
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
