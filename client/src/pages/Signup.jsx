import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useAuthStore } from "../services/useAuthStore";

const Signup = () => 
{
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
  });


  const { signup } =  useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData){
      signup(formData);
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
              value={formData.name}
              placeholder="Enter your name"
              className="block w-full border border-gray-600 p-1.5 rounded-md"
              onChange={(e) => setFormData({...formData,name:e.target.value})}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="email" className="block text-sm font-small pb-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Email address"
              className="block w-full border border-gray-600 p-1.5 rounded-md"
              onChange={(e) => setFormData({...formData,email:e.target.value})}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="password" className="block text-sm font-small pb-6">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              placeholder="Password (min. 6 character)"
              className="block w-full border border-gray-600 p-1.5 rounded-md"
              onChange={(e) => setFormData({...formData,password:e.target.value})}
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
