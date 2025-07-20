import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("user/sign-up", {
        name,
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data.data.user));

      navigate("/login");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.message || error.message
      );

      // --- FIX: Alert the actual message from the server, or a generic signup error message.
      // It is common for the backend API to return a 'message' property on error.
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-sm  p-7 shadow-2xl rounded-md">
        {/* header section */}
        <div className="flex flex-row justify-between pb-6">
          <h1>Sign up</h1>
          <h1>
            Already joined?{" "}
            <strong className="text-gray-800 hover:underline cursor-pointer">
              {" "}
              <Link to="/login">Login now</Link>
            </strong>
          </h1>
        </div>

        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="pb-6">
            <label htmlFor="name" className="block text-sm font-small pb-3">
              User name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="block w-full border border-gray-600 p-1.5 rounded-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="email" className="block text-sm font-small pb-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              className="block w-full border border-gray-600 p-1.5 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="password" className="block text-sm font-small pb-6">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password (min. 6 character)"
              className="block w-full border border-gray-600 p-1.5 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Primary button*/}
          <div>
            <button
              className="w-full p-3 bg-gray-900 hover:bg-gray-800  text-white cursor-pointer border border-transparent rounded-md"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
