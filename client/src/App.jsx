import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import HomePage from './pages/HomePage.jsx';
import ChatPage from './pages/ChatPage.jsx';


function App() {
  const [user,setUser] =useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("chatUser"));
    setUser(storedUser);
  },[]);


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/login" element = {<Login/>} />
      <Route path = "/signup" element = {<Signup/>}/>
      <Route path = "/chat" element = {<ChatPage user = {user}/>} />
      
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App;
