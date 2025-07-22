import React, { useEffect } from 'react'
import { useChatStore } from '../services/useChatStore';
import { Users } from 'lucide-react';


const Sidebar = () => {
  const  {getUsers, users, selectedUser, setSelectedUser} = useChatStore();
  
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  

  
  return (
    <aside className='h-full w-20 lg:w-72 border-r border-gray-700 bg-gray-800 flex flex-col transition-all duration-200'>
      <div className='flex items-center gap-2 h-12 px-2'>
          <Users  />
          <span className='font-medium hidden lg:block text-white'>Users</span>
      </div>
      <div className='overflow y-auto w-full flex-1 px-2 pb-4'>
        {users.map((user)=>(
          <div 
          key={user._id} 
          onClick={()=> setSelectedUser(user)}
            className={`flex w-full items-center gap-3 p-2 rounded transition duration-150 cursor-pointer 
              ${selectedUser?._id === user._id?"bg-gray-700":"hover:bg-gray-600"}`}
            >
            <div className='h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-white font-semibold'>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className='hidden lg:block'>
              <p className='text-sm font-medium text-white'>{user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </aside> 
  )
}

export default Sidebar;
