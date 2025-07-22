import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Loader } from 'lucide-react';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import HomePage from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import { useAuthStore } from './services/useAuthStore.js';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();

  console.log({ onlineUsers });
  useEffect(() => {   
    checkAuth();
  },[checkAuth]);
  console.log("Auth user data:",authUser);

  if(isCheckingAuth && authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin"/>
      </div>
    )

  }

  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login"/>} />
      <Route path = "/login" element = {!authUser?<Login/>: <Navigate to="/" />} />
      <Route path = "/signup" element = {!authUser?<Signup/> : <Navigate to="/"/>}/>
      
      
    </Routes>
  
    <Toaster/>
    </BrowserRouter>
    </div>
  );
}

export default App;
