import React from "react";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    try {
      navigate("/");
      axios.delete(import.meta.env.VITE_APP_URL + "/logout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-20 py-3  flex justify-between items-center bg-rose-500 text-white">
      <Link to={"/dashboard"} className="flex items-center gap-2">
        <BiUser className="w-7 h-7" />
        <h2>Username</h2>
      </Link>
      <div className="flex gap-10 items-center">
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/blog"}>Blog</Link>
        <button
          className="py-2 px-5 bg-emerald-500 rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
