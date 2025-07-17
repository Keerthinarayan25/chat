import React from 'react';
import { Navigate } from 'react-router-dom';


const HomePage = ({ user }) => {
  if(!user){
    return <Navigate to="/login" />;
  }

  return (
    <div>HomePage</div>
  )
}

export default HomePage;