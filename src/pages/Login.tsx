import React, { useState } from "react";
import { BiLogInCircle, BiUserCircle, BiLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/blog";
import { useMutation } from "react-query";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation(loginUser, {
    onSuccess: () => {
      navigate("/blog");
    },
  });

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      name: username,
      password: password,
    });
  };

  return (
    <div className="container mx-auto h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl font-semibold uppercase tracking-wide">Login</h1>
      <form
        action=""
        className="flex flex-col gap-y-3 max-w-[400px] w-1/2 p-5 border-2 mt-5 rounded-md"
        onSubmit={login}
      >
        <div className="flex flex-col gap-y-1">
          <label className="text-lg font-semibold flex gap-x-1 items-center uppercase">
            <BiUserCircle className="w-6 h-6" />
            Username
          </label>
          <input
            type="text"
            className="p-2 border-2 outline-none rounded-md"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1 ">
          <label className="text-lg font-semibold uppercase  flex gap-x-1 items-center">
            <BiLockAlt className="w-6 h-6" />
            Password
          </label>
          <input
            type="text"
            className="p-2 border-2 outline-none rounded-md"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full text-center py-2 rounded-md bg-emerald-400 text-lg mt-4 font-semibold text-white flex items-center justify-center gap-x-1">
          <BiLogInCircle className="w-7 h-7" />
          Login
        </button>
      </form>
    </div>
  );
}
