import React, {useState} from 'react'
import { useAuthStore } from '../services/useAuthStore';
import { Link } from 'react-router-dom';


const Login = () => {

  const [formData, setFormData] = useState({
      email:"",
      password:"",
    });

  const {login } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };




  return (
    <div className="flex justify-center items-center min-h-screen ">

      <div className="w-sm  p-7 shadow-2xl  rounded-xl">
        {/* header section */}
        <div className="flex flex-row justify-between pb-6">
          <h1>Login </h1>
          <h1> No Account?<strong className="text-gray-800 hover:underline cursor-pointer "><Link to="/signup"> Sign up</Link></strong>
          </h1>
        </div>

        <form action="" method="post" onSubmit={handleSubmit}>
          <div className="pb-6">
            <label htmlFor="email" className="block text-sm font-small pb-3">Email</label>
            <input 
            type="email" 
            id="email"
            value={formData.email}
            placeholder="Email address" 
            className="block w-full border border-gray-600 p-1.5 rounded-md"
            onChange={(e) => setFormData({...formData,email:e.target.value})} />
          </div>

          <div className="pb-6">
            <label htmlFor="password" className="block text-sm font-small pb-6">Password</label>
            <input type="password" id="password" placeholder="Password (min. 6 character)" className="block w-full border border-gray-600 p-1.5 rounded-md"
            value={formData.password}
            onChange={(e) => setFormData({...formData,password:e.target.value})}/>
          </div>

            {/* Primary button*/}
          <div> 
            <button className="w-full p-3 bg-gray-900 hover:bg-gray-800  text-white cursor-pointer border border-transparent rounded-md" type="submit">Login</button>
          </div>

        </form>
        

      </div>

    </div>
  )
}

export default Login;