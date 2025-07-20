import React from 'react';
import { useAuthStore } from '../services/useAuthStore';
const Navbar = () => {
  const authUser = useAuthStore();
  return (
    <div>Navbar</div>
  )
}

export default Navbar