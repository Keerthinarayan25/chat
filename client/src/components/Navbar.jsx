import React from 'react';
import {useAuthStore} from "../services/useAuthStore";
import {LogOut} from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const {logout ,authUser} = useAuthStore();
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-lg font-bold text-white">Chit Chat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <button className="flex gap-2 items-center px-3 py-1 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;